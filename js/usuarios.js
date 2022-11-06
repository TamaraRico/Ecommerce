export default class Users{
    constructor(){
        var repository = UserInformationRepository();
    }

    SaveUser(name, email, password){
        if(isEmpty(name) || isEmpty(email) || isEmpty(password)){
            return false;
        }

        repository.Save(name, email, password);
        return true;
    }

    ListUsers(){
        var users = repository.List();
        return users;
    }
    
    SearchEmail(email){
        var emails = repository.SearchEmail(email);
        return emails;
    }

    SearchUserName(user){
        var name = repository.SearchUserName(user);
        return name;
    }

    DeleteUser(iduser){
        repository.Delete(iduser);
        return true;
    }

    Update(name, email, password){
        if(isEmpty(name) || isEmpty(email) || isEmpty(password)){
            return false;
        }

        repository.Update(name, email, password);
        return true;
    }
}