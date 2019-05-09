$(function(){
    var movieList = $('#movieList');
    var movieSubmit = $("#movie");
    var Id = $("#id");
    var name = $("#name");
    var releasedDate = $("#releasedDate");
    var dateAdded = $("#dateAdded");
    var numberInStock = $("#numberInStock");
    var genreName = $("#genreName");

    
    //to get movie list.
    $("#listOfMovies").on('click', function(){
        $.ajax({
            type : "Get",
            url : "https://localhost:44363/api/movies",
            success : function(movies){
                for(let key of movies){
                    movieList.append(
                        "<li><p>" + key.name + "</p>" +
                        "<button id=' + key.id + ' class='remove'>Delete</button>" +
                        "</li>");
                        $(".remove").on('click', function(){
                            $.ajax({
                                type : 'Delete',
                                url : "https://localhost:44363/api/movies/" + key.id,
                                success : function(){
                                    console.log("delete");}
                            })
                        })
                }
            //    $.each(movies, function(i, x){})
            },
            error : function(){
                alert("Something wrong happened.")
            }       
        })

        document.getElementById("listOfMovies").style.display = 'none';
        document.getElementById("moviesList").style.display = 'block';
    })
    $("#addNewMovie").on('click', function(){
        document.getElementById("newForm").style.display = 'block';
    })

    //to sublit a movie.
    
    movieSubmit.on("click", function(){
        var movie = {
            name : name.val(),
            releasedDate : releasedDate.val(),
            dateAdded : dateAdded.val(),
            numberInStock : numberInStock.val(),
            genreId : genreName.val()            
        }
        $.ajax({
            type : 'Post',
            url : 'https://localhost:44363/api/movies',
            data : movie,
            success : function(e){
                movieList.append("<li>" + e.name + "</li>");
            },
            error : function(){
                alert("error submitting movie.");
            }
        })
        
        
    })
    
})