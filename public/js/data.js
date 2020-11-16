

$(document).ready(function() {
    var menu = $('#inputHiddenMenu').val();

    // MAIN
    if (menu == 'data_disease' || menu == 'data_food' || menu == 'data_product' || menu == 'data_symptom' || menu == 'data_tag') {
        // 테이블 tr 클릭 이벤트
        $(document).on('click', '#tBodyDataList tr', function() {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            } else {
                $(this).addClass('selected');
            }

            if ($('.wrapper table tbody tr.selected').length === 1) {
                $('.data-bottom-menu').animate({ bottom: 0 }, 300);
            } else {
                $('.data-bottom-menu').animate({ bottom: '-72px' }, 300);
            }

            if ($('.wrapper table tbody tr.selected').length > 0) {
                $('#buttonSelectedRemove').removeClass('disabled');
            } else {
                $('#buttonSelectedRemove').addClass('disabled');
            }
        });

        // 전체 선택
        $('#buttonSelectAll').click(function() {
            if ($('table tbody tr').length == $('table tbody tr.selected').length) {
                $('table tbody tr').removeClass('selected');
                $('#buttonSelectedRemove').addClass('disabled');
            } else {
                $('table tbody tr').addClass('selected');
                $('#buttonSelectedRemove').removeClass('disabled');
            }

            $('.data-bottom-menu').animate({ bottom: '-72px' }, 300);
        });

        // 선택된 데이터 삭제
        $('#buttonSelectedRemove').click(function() {
            if ($(this).hasClass('disabled') || $('table tbody tr.selected').length === 0) {
                return;
            }

            alert('buttonSelectedRemove');
        });


        if ($('#tBodyDataList').length) {
            var dataType = $('#tBodyDataList').attr('data_type');

            getData(dataType, '');

            $('#buttonDataSearch').click(function() {
                var keyword = $.trim($('#inputDataSearch').val());
                getData(dataType, keyword);
            });
            // 엔터키 이벤트 처리
            $('#inputDataSearch').keydown(function(key) {
                if (key.keyCode == 13) {
                    $('#buttonDataSearch').click();
                }
            });
        }

        $('#buttonAddTag').click(function() {

            var html = '';
            html += '<div class="dialog-add-tag">';
                html += '<h1 class="dialog-title">태그 데이터 추가</h1>';
                html += '<div class="dialog-body">';
                    html += '<div class="form-box">';
                        html += '<p class="form-title">이름</p>';
                        html += '<input class="default" type="text" />';
                    html += '</div>';
                    html += '<div class="form-box">';
                        html += '<p class="form-title">키워드</p>';
                        html += '<div class="keyword-wrapper">';
                            html += '<div id="divKeywordInputTag" class="keyword-input">';
                                html += '<input id="inputKeywordTag" class="default" type="text" />';
                                html += '<button id="buttonAddKeywordTag" class="default"><i class="fal fa-plus"></i></button>';
                            html += '</div>';
                        html += '</div>';
                    html += '</div>';
                html += '</div>';
                html += '<div class="dialog-footer">';
                    html += '<button id="buttonSaveTagCancel" class="default cancel">취소</button>';
                    html += '<button id="buttonSaveTag" class="default">저장</button>';
                html += '</div>';
            html += '</div>';

            $('body').append('<div class="overlay" key="DIALOG_ADD_TAG"></div>');
            $('body').addClass('overflow-hidden');
            $('body').append(html);

            $('#buttonSaveTagCancel').click(function() {
                $('.overlay[key=DIALOG_ADD_TAG]').remove();
                $('.dialog-add-tag').remove();
            });
            $('#buttonSaveTag').click(function() {
                alert('buttonSaveTag');
            });
            $('#buttonAddKeywordTag').click(function() {
                var value = $.trim($('#inputKeywordTag').val());

                var isDuplicated = false;
                $('.dialog-add-tag .dialog-body .form-box .keyword-wrapper > p').each(function() {
                    if ($(this).text() == value) {
                        isDuplicated = true;
                        return;
                    }
                });
                if (isDuplicated) {
                    alert('이미 추가된 키워드입니다.');
                    $('#inputKeyword').select();
                    return;
                }

                if (value == '') return;

                $('#divKeywordInputTag').before('<p>' + value + '</p>');
                $('#inputKeywordTag').val('');
            });
            $(document).on('click', '.dialog-add-tag .dialog-body .form-box .keyword-wrapper > p', function() {
                $(this).remove();
            });
        });
    }

    // ADD
    if (menu == 'data_disease_add' || menu == 'data_food_add' || menu == 'data_product_add' || menu == 'data_symptom_add' || menu == 'data_tag_add') {
        // 썸네일 이미지 업로드
        $('#buttonUploadThumb').click(function() {
            $('.wrapper .form-box .thumb-wrapper form input').click();
        });
        $('.wrapper .form-box .thumb-wrapper form input').change(function(e) {
            changeInputImage(e, function(result) {
                setBackgroundImage($('#divThumb'), result);
            }, function() {
                removeBackGroundImage($('#divThumb'));
            });
        });

        // 키워드 추가
        $('#buttonAddKeyword').click(function() {
            var value = $.trim($('#inputKeyword').val());

            var isDuplicated = false;
            $('.wrapper.add .form-box .keyword-wrapper > p').each(function() {
                if ($(this).text() == value) {
                    isDuplicated = true;
                    return;
                }
            });
            if (isDuplicated) {
                alert('이미 추가된 키워드입니다.');
                $('#inputKeyword').select();
                return;
            }

            if (value == '') return;

            $('#divKeywordInput').before('<p>' + value + '</p>');
            $('#inputKeyword').val('');
        });
        $(document).on('click', '.wrapper.add .form-box .keyword-wrapper > p', function() {
            $(this).remove();
        });

        // 이미지 추가
        $('#buttonAddImage').click(function() {
            $('.wrapper .form-box .image-wrapper > form input').click();
        });
        // 이미지 제거
        $(document).on('click', '.wrapper.add .form-box .image-wrapper .image-box .image', function() {
            $(this).parent().remove();
            resetImageBoxSelect();
        });
        $('.wrapper .form-box .image-wrapper > form input').change(function(e) {
            var input = this;
            changeInputImage(e, function(result) {
                var newImageBoxIndex = $('.wrapper.add .form-box .image-wrapper .image-box').length + 1;

                var html = '';
                html += '<div class="image-box">';
                    html += '<select class="default">';
                        for (var i = 0; i < newImageBoxIndex; i++) {
                            if (i == newImageBoxIndex - 1) {
                                html += '<option value="' + (i + 1) + '" selected>' + (i + 1) + '</option>';
                            } else {
                                html += '<option value="' + (i + 1) + '">' + (i + 1) + '</option>';
                            }
                        }
                    html += '</select>';
                    html += '<form method="post" enctype="multipart/form-data" temp="TRUE"></form>';
                    html += '<div class="image" style="background-image: url(' + result + ')"></div>';
                html += '</div>';
                $('#buttonAddImage').before(html);

                var cloneInput = $('.wrapper .form-box .image-wrapper > form input').clone();
                $('.wrapper .form-box .image-wrapper .image-box form[temp=TRUE]').html(cloneInput);

                $('.wrapper .form-box .image-wrapper .image-box form[temp=TRUE]').attr('temp', 'FALSE');
                $('.wrapper .form-box .image-wrapper > form').get(0).reset(); // 더미 input reset

                // select 재설정
                $('.wrapper .form-box .image-wrapper .image-box select').each(function() {
                    var optionCnt = $(this).find('option').length;
                    if (optionCnt == newImageBoxIndex) return;
                    $(this).append('<option value="' + newImageBoxIndex + '">' + newImageBoxIndex + '</option>');
                });

            }, function() {

            });
        });

        // 이미지 순서 바꿈
        $(document).on('change', '.wrapper .form-box .image-wrapper .image-box select', function() {
            var thisIndex = $(this).parent().index();
            var targetIndex = parseInt($(this).val());

            var $thisImageBox = $(this).parent();
            var $targetImageBox = $('.wrapper .form-box .image-wrapper .image-box:nth-child(' + (targetIndex + 1) + ')');

            var thisCloneInput = $($($thisImageBox.children('form').get(0)).children('input').get(0)).clone();
            var targetCloneInput = $($($targetImageBox.children('form').get(0)).children('input').get(0)).clone();

            var thisImageUrl = getBackgroundImage($($thisImageBox.children('.image').get(0)));
            var targetImageUrl = getBackgroundImage($($targetImageBox.children('.image').get(0)));

            // console.log(thisImageUrl, targetImageUrl);

            setBackgroundImage($($thisImageBox.children('.image').get(0)), targetImageUrl);
            setBackgroundImage($($targetImageBox.children('.image').get(0)), thisImageUrl);

            // var temp = $targetImageBox.get(0).innerHTML;
            // $targetImageBox.get(0).innerHTML = $thisImageBox.get(0).innerHTML;
            // $thisImageBox.get(0).innerHTML = temp;

            $($targetImageBox.children('form').get(0)).html(thisCloneInput);
            $($thisImageBox.children('form').get(0)).html(targetCloneInput);

            resetImageBoxSelect();
        });

        // 연관 데이터 추가
        $('.wrapper .form-box .relationship-wrapper button').click(function() {
            var dataType = $(this).attr('data_type');

            $('body').addClass('overflow-hidden');
            $('body').append('<div class="overlay" key="DIALOG_SEARCH"></div>');
            var html = '';
            html += '<div class="dialog-data-search">';
                html += '<h1 class="dialog-title"><span>연관 ' + convertDataTypeToString(dataType) + '</span> 찾기</h1>';
                html += '<div class="controller">';
                    html += '<div class="search-box">';
                        html += '<select>';
                            html += '<option selected>이름</option>';
                        html += '</select>';
                        html += '<input id="inputDialogDataSearch" type="text" placeholder="검색어를 입력해주세요." />';
                        html += '<button class="default">검색</button>';
                    html += '</div>';
                html += '</div>';
                html += '<div class="dialog-body">';
                    html += '<table>';
                        html += '<thead>';
                            html += '<tr>';
                                html += '<th width="50">#</th>';
                                if(dataType != 'tag') html += '<th width="150">썸네일</th>';
                                html += '<th>이름</th>';
                                html += '<th>키워드</th>';
                                if (dataType == 'food') html += '<th>섭취가능</th>';
                                html += '<th>생성일</th>';
                            html += '</tr>';
                        html += '</thead>';
                        html += '<tbody id="tBodyDataList"></tbody>';
                    html += '</table>';
                html += '</div>';
            html += '</div>';
            $('body').append(html);
            $('.overlay[key=DIALOG_SEARCH]').click(function() {
                $(this).remove();
                $('.dialog-data-search').remove();
                $('body').removeClass('overflow-hidden');
            });

            getData(dataType, '');
            $('.dialog-data-search .controller .search-box button').click(function() {
                var keyword = $.trim($('#inputDialogDataSearch').val());
                getData(dataType, keyword);
            });
            // 엔터키 이벤트 처리
            $('#inputDialogDataSearch').keydown(function(key) {
                if (key.keyCode == 13) {
                    $('.dialog-data-search .controller .search-box button').click();
                }
            });
        });
        $(document).on('click', '.wrapper.add .form-box .relationship-wrapper > p', function() {
            $(this).remove();
        });

        $(document).on('click', '#tBodyDataList tr', function() {
            var id = $(this).attr('id');
            var dataType = $(this).attr('data_type');

            var isDuplicated = false;
            $('.wrapper .form-box[data_type=' + dataType + '] .relationship-wrapper > p').each(function() {
                if ($(this).attr('id') == id) {
                    alert('이미 등록된 ' + convertDataTypeToString(dataType) + '입니다.');
                    isDuplicated = true;
                    return;
                }
            });

            if (isDuplicated) return;

            var name = $($(this).children('td.name').get(0)).text();
            var html = '<p id="' + id + '">' + name + '</p>';

            $('.wrapper .form-box .relationship-wrapper button[data_type=' + dataType + ']').before(html);

            $('.overlay[key=DIALOG_SEARCH]').remove();
            $('.dialog-data-search').remove();
            $('body').removeClass('overflow-hidden');
        });

        $('#buttonSaveData').click(function() {
            var dataType = $(this).attr('data_type');
            var name = $.trim($('#inputName').val());
            var desc1 = $.trim($('#textareaDesc1').val());
            var desc2 = $.trim($('#textareaDesc2').val());
            var keyword = '';
            var disease_list = [];
            var food_list = [];
            var symptom_list = [];
            var product_list = [];
            var tag_list = [];

            var keyword_list = [];
            $('.wrapper .form-box .keyword-wrapper > p').each(function() {
                keyword_list.push($(this).text());
            });
            keyword = keyword_list.join('|');

            $('.wrapper .form-box[data_type=disease] .relationship-wrapper > p').each(function() {
                disease_list.push($(this).attr('id'));
            });
            $('.wrapper .form-box[data_type=symptom] .relationship-wrapper > p').each(function() {
                symptom_list.push($(this).attr('id'));
            });
            $('.wrapper .form-box[data_type=product] .relationship-wrapper > p').each(function() {
                product_list.push($(this).attr('id'));
            });
            $('.wrapper .form-box[data_type=food] .relationship-wrapper > p').each(function() {
                food_list.push($(this).attr('id'));
            });
            $('.wrapper .form-box[data_type=tag] .relationship-wrapper > p').each(function() {
                tag_list.push($(this).attr('id'));
            });

            console.log(dataType);
            console.log(name);
            console.log(desc1);
            console.log(desc2);
            console.log(keyword);
            console.log(disease_list);
            console.log(food_list);
            console.log(symptom_list);
            console.log(product_list);
            console.log(tag_list);
        });
    }
});


function getData(dataType, keyword) {
    createSpinner();
    $('#tBodyDataList').empty();

    $.get(
        '/webapi/get/data',
        { dataType: dataType, keyword: keyword },
        function(response) {
            removeSpinner();
            if (response.status != 'OK') {
                console.log('ERROR');
                return;
            }

            var html = '';
            var data_list = response.result.data_list;
            for (var i = 0; i < data_list.length; i++) {
                var data = data_list[i];

                    if (dataType == 'food') {
                        html += '<tr id="' + data.f_id + '" data_type="' + dataType + '">';
                            html += '<td>' + data.f_id + '</td>';
                            html += '<td><div class="thumb" style="background-image: url(/img/sample.jpg);"></div></td>';
                            html += '<td class="name">' + data.f_name + '</td>';
                            html += '<td>' + data.f_keyword + '</td>';
                            html += '<td>' + data.f_eatable + '</td>';
                            html += '<td>' + data.f_created_date.split(' ')[0] + '</td>';
                        html += '</tr>';

                    } else if (dataType == 'symptom') {
                        html += '<tr id="' + data.s_id + '" data_type="' + dataType + '">';
                            html += '<td>' + data.s_id + '</td>';
                            html += '<td><div class="thumb" style="background-image: url(/img/sample.jpg);"></div></td>';
                            html += '<td class="name">' + data.s_name + '</td>';
                            html += '<td>' + data.s_keyword + '</td>';
                            html += '<td>' + data.s_created_date.split(' ')[0] + '</td>';
                        html += '</tr>';

                    } else if (dataType == 'disease') {
                        html += '<tr id="' + data.d_id + '" data_type="' + dataType + '">';
                            html += '<td>' + data.d_id + '</td>';
                            html += '<td><div class="thumb" style="background-image: url(/img/sample.jpg);"></div></td>';
                            html += '<td class="name">' + data.d_name + '</td>';
                            html += '<td>' + data.d_keyword + '</td>';
                            html += '<td>' + data.d_created_date.split(' ')[0] + '</td>';
                        html += '</tr>';

                    } else if (dataType == 'product') {
                        html += '<tr id="' + data.p_id + '" data_type="' + dataType + '">';
                            html += '<td>' + data.p_id + '</td>';
                            html += '<td><div class="thumb" style="background-image: url(/img/sample.jpg);"></div></td>';
                            html += '<td class="name">' + data.p_name + '</td>';
                            html += '<td>' + data.p_keyword + '</td>';
                            html += '<td>' + data.p_created_date.split(' ')[0] + '</td>';
                        html += '</tr>';

                    } else if (dataType == 'tag') {
                        html += '<tr id="' + data.t_id + '" data_type="' + dataType + '">';
                            html += '<td>' + data.t_id + '</td>';
                            html += '<td class="name">' + data.t_name + '</td>';
                            html += '<td>' + data.t_keyword + '</td>';
                            html += '<td>' + data.t_created_date.split(' ')[0] + '</td>';
                        html += '</tr>';
                    }
            }
            $('#tBodyDataList').html(html);
        },
        'json'
    );
}


// select 재설정
function resetImageBoxSelect() {
    $('.wrapper .form-box .image-wrapper .image-box select').each(function(index) {
        var totalImageBoxIndex = $('.wrapper.add .form-box .image-wrapper .image-box').length;
        var html = '';
        for (var i = 0; i < totalImageBoxIndex; i++) {
            if (i == index) {
                html += '<option value="' + (i + 1) + '" selected>' + (i + 1) +'</option>';
            } else {
                html += '<option value="' + (i + 1) + '">' + (i + 1) +'</option>';
            }
        }
        $(this).html(html);
    });
}
