class Pagos{
    constructor(){
        var repository = InformacionDePagoRepository();
    }

    SaveCredirCard(credirCardNumber, credirCardCvv, monthOfExpiration, yearOfExpiration){
        if(isEmpty(credirCardNumber) || isEmpty(credirCardCvv) || isEmpty(monthOfExpiration) || isEmpty(yearOfExpiration)){
            return false;
        }

        repository.Save(credirCardNumber, credirCardCvv, monthOfExpiration, yearOfExpiration);
        return true;
    }

    ListCreditCards(){
        var cards = repository.List();
        return cards;
    }
    
    SearchCardNumber(credirCardNumber){
        var card = repository.SearchEmail(credirCardNumber);
        return card;
    }

    DeleteCreditCard(idInformacionDePago){
        repository.Delete(idInformacionDePago);
        return true;
    }

    Update(credirCardNumber, credirCardCvv, monthOfExpiration, yearOfExpiration){
        if(isEmpty(credirCardNumber) || isEmpty(credirCardCvv) || isEmpty(monthOfExpiration) || isEmpty(yearOfExpiration)){
            return false;
        }

        repository.Update(credirCardNumber, credirCardCvv, monthOfExpiration, yearOfExpiration);
        return true;
    }
}