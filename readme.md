VIEWS:

-Home-
Displays Login Nav-bar, Categories Nav-bar, Hero, About, Explore

-Login-
Displays the LOGIN FORM (username, password)

-Register-
Displays the REGISTER FORM (username, e-mail, password)

-Welcome Screen-
Displays an welcome message

-Explore-
Displays all the projects

-Single-
Displays a single project

-Edit Single
Displays a single project but with edit options

-Create Project-
Displays the CREATE PROJECT FORM

-Contribute with Money-
Displays the STRIPE FORM

-Profile-
Displays the user profile, e-mail and location and the My Actions and My Projects links

-Edit Account-
Displays the EDIT ACCOUNT FORM

-My Actions-
Displays all actions that the user helped

-My Projects-
Displays all projects created by the user

#####################################################################

ROUTES:

ROUTES:
-Home-
GET - "/"

-Login-
GET - "/authentication/login"
POST - "/authentication/login"

-Register-
GET - "/authentication/register"
POST - "/authentication/register"

-Welcome Screen-
GET - "/welcome"

-Explore-
GET - "/project"

-Category-
GET - "project/category/:name"

-Single-
GET - "/project/:project_id"

-Edit Project-
GET - "/project/:project_id/edit"
POST - "/project/:project_id/edit"

-Create Project-
GET - "/project/create"
POST - "/project/create"

-Contribute With Money-
GET - "/project/:project_id/contribute"
POST - "/project/:project_id/contribute"

-Profile-
GET - "/user/:user_id"

-Edit Account-
GET - "/user/:user_id/edit"
POST - "/user/:user_id/edit"

-My Actions-
GET - "/user/:user_id/actions"
POST - "/user/:user_id/actions"

-My Projects-
GET - "/user/:user_id/projects"
POST - "/user/:user_id/projects"
