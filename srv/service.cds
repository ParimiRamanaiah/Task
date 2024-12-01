using {my.app.master as master} from '../db/schema';

service MyService { 
    entity Users as projection on master.User;
    entity Roles as projection on master.Role;
    entity Screens as projection on master.Screen;
    entity UserRoleMappings as projection on master.UserRoleMapping;
    entity RoleScreenMappings as projection on master.RoleScreenMapping;
    @requires: 'authenticated-user'
    entity FilterScreen as projection on master.FilterScreen
    action getUser();
}