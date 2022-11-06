class Service{
    constructor(){
        var repository = ProductRepository();
    }

    CalculateProductTax(precio){
        Tax = 0.0875;
        productTax = precio * Tax;
        return productTax;
    }

    SaveProduct(album, artista, descripcion, genero, cantidad, precio){
        if(isEmpty(album) || isEmpty(artista) || isEmpty(descripcion) || isEmpty(genero) || isEmpty(cantidad) || isEmpty(precio)){
            return false;
        }

        repository.Save(album, artista, descripcion, genero, cantidad, precio);
        return true;
    }

    ListProducts(){
        var products = repository.List();
        return products;
    }
    
    SearchProduct(album){
        var products = repository.SearchAlbum(album);
        return products;
    }

    SearchArtist(artista){
        var products = repository.SearchArtist(artista);
        return products;
    }

    SearchGenre(genero){
        var products = repository.SearchGenre(genero);
        return products;
    }

    SearchAlbumAndArtist(album, artista){
        var products = repository.SearchAlbumAndArtist(album, artista);
        return products;
    }

    DeleteAlbum(idproducto){
        repository.Delete(idproducto);
        return true;
    }

    Update(album, artista, descripcion, genero, cantidad, precio, idproductos){
        if(isEmpty(album) || isEmpty(artista) || isEmpty(descripcion) || isEmpty(genero) || isEmpty(cantidad) || isEmpty(precio || isEmpty(idproductos))){
            return false;
        }

        repository.Update(album, artista, descripcion, genero, cantidad, precio, idproductos);
        return true;
    }
}