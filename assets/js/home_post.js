{
    //method to submit the form data fornewpost using ajax
   let createPost = function(){
    let newPostForm = $('#new-post-form');

    newPostForm.submit(function(e){
        e.preventDefault();

        $.ajax({
            type : 'post',
            url  : '/posts/create',
            data : newPostForm.serialize(), 
            success : function(data){
              console.log(data);
                let newPost = newPostDom(data.post);
                $('#post-list-container>ul').prepend(newPost);
                deletePost($('.delete-post-button',newPost));
            },
             error :function(error){
                console.log(error.responseText);
            }
        })
    });
   } 

   //method to create post in DOM
   let newPostDom = function(post){
      return $(`<li id="post-${post._id}">
      <p>     
          <!-- user.id gets the string of user._id and user._id is of type ObjectId -->
             
                   <small>
                      <a class="delete-post-button" href="/posts/destroy/${post._id}">x</a>
                   <small>
             
              ${post.content} 
              <br><small>${post.user.name}</small>
              
      </p>
      <div class="post-comments">
             
                      <form action="/comments/create" method="POST">
                              <input type="text" name="content"  placeholder="Type here to add comment..." required></input>
                              <input type="hidden" name="post" value="${post._id}">
                              <input type="submit" value="Add comment">
                      </form>
                    
              <div class="post-comments-list">
                      <ul id="post-comments- ${post._id}">
                             
                      </ul>
  
              </div>
      </div>
  </li>`)
    }
    //method to delte post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            
        $.ajax({
            type : 'get',
            url  : $(deleteLink).prop('href'),
            success : function(data){
                console.log(data);
              $(`#post-${data.data.post_id}`).remove();
            },
             error :function(error){
                console.log(error.responseText);
            }
        })
        })

    }
   createPost();
}