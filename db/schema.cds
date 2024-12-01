namespace my.app;
context master{
entity User{
  key ID:Integer;
  UserName:String(50);
}

entity Role{
  key ID:Integer;
  RoleName:String(50);
}

entity Screen{
  key ID:Integer;
  ScreenName:String(50);
}

entity UserRoleMapping{
  key ID:Integer;
  User:Association to User;
  Role:Association to Role;
}

entity RoleScreenMapping{
  key ID:Integer;
  Role:Association to Role;
  Screen:Association to Screen;
}
entity FilterScreen{
  key ID:Integer;
  ScreenName:String(50);
}
}

