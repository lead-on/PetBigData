$(document).ready(function() {

    $("#inputIdolUploadImage").change(function(e) {

        var files = e.target.files;
        var file_list = Array.prototype.slice.call(files);

        file_list.forEach(function(file) {
            if (!file.type.match('image.*')) {
                alert('이미지 파일만 업로드할 수 있습니다.');
                return;
            }

            if (file.size > 20000000) {
                alert('최대 20MB 크기의 이미지 파일을 업로드할 수 있습니다.');
                return;
            }

            var reader = new FileReader();
            reader.onload = function(e) {
                var form = new FormData($('#formIdolUploadImage').get(0));

                $.ajax({
                    url: '/upload_img',
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    dataType: 'json',
                    data: form,
                    processData: false,
                    contentType: false,
                    cache: false,
                    success: function(response){
                        if (response.status != 'OK') {
                            alert('에러가 발생했습니다.');
                            return;
                        }
                        alert("성공")
                    }
                });
            }
            reader.readAsDataURL(file);
        });
    });
});
