define(['FlatsManager',
        'tpl!apps/flats/common/templates/flat-edit.tpl.html',
        'jquery.fileapi',
		'backbone.syphon'],
function(FlatsManager, FlatEditTpl){
    FlatsManager.module('ContactsApp.Common.Views', function (Views, FlatsManager, Backbone, Marionette, $, _) {

        // ����� ��������������/�������� ��������
        // ---------------
		Views.FlatEditForm = Marionette.ItemView.extend({
		    template: FlatEditTpl,
		    ui: {
		        uploadImgContainer  :   '.js-upload-container',
		        submitBtn           :   '.js-submit',
                imagesIds           :   '.js-images-list'
            },
			events: {
			    'click .js-submit'  :   'submitClicked',
			    'click .js-img-add' :   'addImgClicked'
			},
			submitClicked: function (e) {
			    e.preventDefault();
				var data = Backbone.Syphon.serialize(this);
				if (!$(this.ui.submitBtn).is(':disabled')) {
				    this.trigger('form:submit', data);
                }
			},
			addImgClicked: function () {
			    $(this.ui.uploadImgContainer).find('#js-img-input').trigger('click');
			},
			onRender: function () {
			    var imgUploader = new UploadImgConstructor();
			    imgUploader.init.apply(this);
			}
		});
    });


    // ����������� �������� ���� �������
    // ---------------
    var UploadImgConstructor = function () {
        var elms = {
            imgUpload       :   '.js-img__upload',
            imgList         :   '.js-img__list',
            imgTpl          :   '.js-img__tpl',
            imgTplPreview   :   '.js-img__tpl__preview',
            imgProgress     :   '.js-img__progress',
            imgComplete     :   '.js-img__complete',
            imgBar          :   '.js-img__bar',
            imgDelete       :   '.js-img__delete'
        },
            imgCount = 0,
            uploadedCount = 0;

        // init img upload
        // ----------
        function init() {
            var _this = this;
            $(_this.ui.uploadImgContainer).fileapi({
                url: '/files/image',
                accept: 'image/*',
                multiple: true,
                maxFiles: 10,
                autoUpload: true,
                elements: {
                    emptyQueue: { hide: elms.imgUpload },
                    list: elms.imgList,
                    file: {
                        tpl: elms.imgTpl,
                        preview: {
                            el: elms.imgTplPreview,
                            width: 90,
                            height: 90
                        },
                        upload: { show: elms.imgProgress, hide: elms.imgComplete },
                        complete: { hide: elms.imgProgress, show: elms.imgDelete + ',' + elms.imgComplete },
                        progress: elms.imgBar
                    }
                },
                onBeforeUpload: function (evt, uiEvt) {
                    $(_this.ui.submitBtn).prop('disabled', true);
                    imgCount = uiEvt.files.length;
                    uploadedCount = 0;
                },
                onFileComplete: function (evt, uiEvt) {
                    var $el = uiEvt.file.$el,
                        $inputHidden = $('<input>', {
                            type: 'hidden',
                            name: 'images[]',
                            value: uiEvt.result
                        });
                    $el.append($inputHidden);

                    // --------------
                    if (uiEvt.result != undefined) {
                        uploadedCount++;
                        $(_this.ui.imagesIds).val($(_this.ui.imagesIds).val() + ',' + uiEvt.result);
                        if (imgCount === uploadedCount) {
                            $(_this.ui.submitBtn).prop('disabled', false);
                        }
                    }
                }
            });
        }

        return {
            init: init
        }
    }

    return FlatsManager.ContactsApp.Common.Views;
});