/**
 +------------------------------------------------------------------------------
 * 产品列表的界面js
 +------------------------------------------------------------------------------
 * @category	js/project
 * @package		product
 * @subpackage  Exception
 * @author		lkh <kanghua.li@witsion.com>
 * @version		1.0
 +------------------------------------------------------------------------------
 */
 
if (typeof importFile === 'undefined')  importFile = new Object();

importFile={
	showImportModal:function(title, form_action_url, template_path, itype, callback ){
		
		html = '<div id = "import_excel_body">'+
		'<form id="form_import_file"; action="'+form_action_url+'" method="post" enctype="multipart/form-data">'+
		'<input type="file" id="input_import_file" name="input_import_file">'+
		'<input type="hidden" id="input_import_itype" name="input_import_itype" value="'+ itype +'">'+
		'</form>';
		if (template_path !='')
			html+='<p>'+Translator.t('XLS示例文件下载')+' <a href="'+template_path+'">'+Translator.t('例子下载')+'</a></p><br>';
		
		html+='<p style="color:red">'+Translator.t('注意：')+"</p>"+
		'<span style="color:blue">&nbsp;&nbsp;&nbsp;&nbsp;'+Translator.t('只允许上传excel格式文件(.xls或.xlsx)；')+"</span><br>"+
		'<span style="color:blue">&nbsp;&nbsp;&nbsp;&nbsp;'+Translator.t('为保证上传质量，最好一次上传不超过100个产品。')+"</span><br>"+
		'</div>';
		
		importFile_bootbox = bootbox.dialog({
			
			title: title,//
			message: html,
			//show : false,
			buttons:{
				Cancel: {  
					label: Translator.t("返回"),  
					className: "btn-default",  
					callback : function(){
						
					}
				}, 
				OK: {  
					label: Translator.t("保存"),  
					className: "btn-primary",  
					callback : function(){
						//callback();
						
						importFile.importExcelFile(callback);
					}
				}, 
			}
		});
	},
	
	importExcelFile:function(callback){
		if ($('#input_import_file').val().length ==0){
			bootbox.alert(Translator.t("请选择需要的上传文件!"));
			return false;
		}
		
		$('#import_excel_body').css('display','none');
		$('#import_excel_body').parent().addClass('bg_loading');
		if (typeof(importFile_bootbox) != "undefined"){
			importFile_bootbox.find('.btn-primary').attr('data-loading-text',Translator.t('上传中'));
			importFile_bootbox.find('.btn-primary').button('loading');
		}
		$.showLoading();
		$.ajaxFileUpload({  
			url: $('#form_import_file').attr('action'),//请求路径
			secureuri:false,
			isUploadFile:true,
			isNotCheckFile:true,
			fileElementId:'input_import_file',//file控件的name属性值，所有批量上传的file控件name必须一致
			data: {itype:$('#input_import_itype').val()},
			dataType: 'json',//返回数据的类型
			//data:{"desc":desc},//上传文件时可同时附带其他数据
			success: function (result){ 
			//debugger;
				$('#import_excel_body').css('display','block');
				$('#import_excel_body').parent().removeClass('bg_loading');
				$('#btn-import-file').button('reset');
				callback(result);
				$.hideLoading();
			},  
			error: function (result){
				$.hideLoading();
				bootbox.alert(Translator.t('数据传输错误！'));
				/*
				bootbox.alert(result.message);
				$('#import_excel_body').css('display','block');
				$('#import_excel_body').parent().removeClass('bg_loading');
				$('#btn-import-file').button('reset');
				*/
				return false;
			}  
		});
	},
}