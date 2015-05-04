var uploadImg = function () {
  alert('uploading');
  console.log($('#uploadForm'));
  $('#uploadForm')[0].submit(function() {
        //status('uploading the file ...');
        alert('working');
        console.dir($(this).ajaxSubmit);
        $(this).ajaxSubmit({

            error: function(xhr) {
              alert('Error: ' + xhr.status);
            },

            success: function(response) {
    //TODO: We will fill this in later
            }
        });
        alert('doing');

  // Have to stop the form from submitting and causing
  // a page refresh - don't forget this
    return false;
  });

}

var ImgUploadContent = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var form = new FormData();
    form.append("file",e.target.userPhoto.files[0])
    var xhr = new XMLHttpRequest();
    xhr.open('post', '/uploadimg', true);
    xhr.onload= function () {
      console.log("loaded.");
    }
    xhr.send(form);
  },

  render: function () {
    return (
      <div className="uploadView">
        <h1>Upload Image</h1>
        <form id="uploadForm"
          onSubmit={this.handleSubmit}>
          <input type="file" id="userPhotoInput" name="userPhoto" />

          <span id="status" />
          <img id="uploadedImage" />
          <input type="submit" />
        </form>
    </div>
    );
  }

});
  
