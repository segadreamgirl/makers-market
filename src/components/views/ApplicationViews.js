import { UserView } from "./UserView"


export const ApplicationViews = () => {

	const user = localStorage.getItem("makers_user")
	const userObject = JSON.parse(user)
	    if(userObject.id){
            return <UserView/>
        }
}

