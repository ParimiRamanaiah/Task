const cds = require('@sap/cds');

module.exports = function (srv) {
 
    // Get the necessary entities
const { FilterScreen, User, UserRoleMapping, RoleScreenMapping, Screen } = cds.entities('my.app.master');
 
    // Action to get user screens
    srv.on('getUser', async (req) => {
        const tx = cds.transaction(req);  // Begin a transaction
        try {
            // Get the logged-in user from SAP BTP cockpit
const username = req.user.id; // Assuming `req.user.id` holds the email or unique username
 
            // Fetch the user details from the User entity
const users = await tx.run(SELECT.from(User).where({ UserName: username }));
            if (users.length === 0) {
                return req.reject(404, `User ${username} not found`);
            }
            const userId = users[0].ID;
 
            // Get roles associated with the user
const userRoles = await tx.run(SELECT.from(UserRoleMapping).where({ User_ID: userId }));
            if (userRoles.length === 0) {
                return req.reject(404, `No roles found for user ${username}`);
            }
            const roleIds = userRoles.map(role => role.Role_ID);
 
            // Check if roleIds list is not empty before proceeding
            if (roleIds.length === 0) {
                return req.reject(404, `No associated roles found for user ${username}`);
            }
 
            // Get screens associated with the roles
const roleScreens = await tx.run(SELECT.from(RoleScreenMapping).where({ Role_ID: { in: roleIds } }));
            if (roleScreens.length === 0) {
                return req.reject(404, `No screens found for roles of user ${username}`);
            }
            const screenIds = roleScreens.map(screen => screen.Screen_ID);
 
            // Fetch the actual screens from the Screen entity
const screens = await tx.run(SELECT.from(Screen).where({ ID: { in: screenIds } }));
 
            //clear existing data from table
            await tx.run(DELETE.from(FilterScreen));

            // Insert the filtered screens into the FilterScreen entity
            for (let screen of screens) {
                const query = INSERT.into(FilterScreen).columns('ID', 'ScreenName').values(screen.ID, screen.ScreenName);
await tx.run(query);
            }
 
            // Commit the transaction (this ensures the inserts are saved in postgress)
            await tx.commit();
 
            console.log(`${username} can see the following screens: ${screens.map(s => s.ScreenName).join(', ')}`);
            return screens;  // Return the screens to the frontend
 
        } catch (error) {
            // If any error occurs, rollback the transaction and log the error
            await tx.rollback();
            console.error(`Error processing getUser action: ${error.message}`);
            return req.reject(500, `Failed to process getUser action: ${error.message}`);
        }
    });
}