
$(document).ready(function() {

});


function setBackgroundImage(target, url) {
    $(target).css('background-image', 'url(' + url + ')');
}
function getBackgroundImage(target) {
    var url = $(target).css('background-image');
    if (!url) return '';
    url = url.replace('url(\"', '').replace('\");', '').replace('\")', '');
    url = url.replace('url(\'', '').replace('\');', '').replace('\')', '');
    return url;
}
function removeBackGroundImage(target) {
    $(target).css('background-image', '');
}


function createSpinner() {
    $('body').append('<div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>');
}
function removeSpinner() {
    $('.lds-roller').remove();
}


// 이미지 인풋 onchange 처리 함수
function changeInputImage(e, load, cancel) {
    var files = e.target.files;
    var file_list = Array.prototype.slice.call(files);

    // 취소
    if (file_list.length == 0) {
        cancel();
    }

    file_list.forEach(function(file) {
        if (!file.type.match('image.*')) {
            alert('이미지 파일만 업로드할 수 있습니다.');
            return;
        }

        if (file.size > 100000000) {
            alert('최대 100MB 크기의 이미지 파일을 업로드할 수 있습니다.');
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            load(e.target.result);
        }
        reader.readAsDataURL(file);
    });
}


function convertDataTypeToString(dataType) {
    var string = '';
    if (dataType == 'food') {
        string = '음식';
    } else if (dataType == 'symptom') {
        string = '증상';
    } else if (dataType == 'product') {
        string = '제품';
    } else if (dataType == 'disease') {
        string = '질병'
    } else if (dataType == 'tag') {
        string =  '태그';
    }

    return string;
}
