(function ( $ ) {
	
	$.fn.valit = function ( options ) 
	{
		
		var defaults = $.extend (
		{
			wrap_error_message: 'span',
			wrap_error_class: 'danger label',
			label_error_class: 'error',
			input_error_class: 'danger',
			input_success_class: 'success',
			add_error_to_parent: true,
			parent_error_class: 'danger',
			add_success_to_parent: true,
			parent_success_class: 'success',
			trigger: 'focusout'
		}, options );
			
		return this.on(defaults.trigger, this, function (e) 
		{			
		
			var valit_required		=	$(this).data('valit-required');
			var valit_email			=	$(this).data('valit-email');
			var valit_num			=	$(this).data('valit-num');
			var valit_tel			=	$(this).data('valit-tel');
			var valit_postcode		=	$(this).data('valit-postcode');
			var valit_length			=	$(this).data('valit-len');
	
			var valit_ele_id 		= 	$(this).attr('id'); // Grab the ID of the element
			var valit_label			=	$(document).find(' label[for="' + valit_ele_id + '"] ');
		
			var pass_validation 		=	true;
			var error_message 		=	[];
			
			if ( '[data-element^="valit-"]' ) // Check to see if the element has the data attribute
			{
							
				if ($(this).data('valit-required'))
				{					
					
					if($(this).val().length==0)
					{
						pass_validation = false;
						error_message.push(valit_required);
					}
					else
					{
						error_message.splice($.inArray(valit_required, error_message),1);
					}
				}
				
				if ($(this).data('valit-email'))
				{					
					var email_regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
					  
					if( !email_regex.test( $(this).val() ) )
					{
						pass_validation = false;
						error_message.push(valit_email);
					} 
				}
				
				if ( $(this).data('valit-num') )
				{				
					if ( !validate_number( $(this).val() ) )
					{
						pass_validation = false;
						error_message.push(valit_num);
					}
				}
				
				if ( $(this).data('valit-tel') )
				{
					var char_len = valit_tel.split('|');	
					if ( !validate_number( $(this).val() ) || $(this).val().length < char_len[0] ) 
					{
						pass_validation = false;
						error_message.push(char_len[1]);
					}
				}
				
				if ( $(this).data('valit-postcode') )
				{
					var poscode_regex = /^(GIR 0AA)|((([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][0-9]?)|(([ABCDEFGHIJKLMNOPRSTUWYZ][0-9][ABCDEFGHJKSTUW])|([ABCDEFGHIJKLMNOPRSTUWYZ][ABCDEFGHKLMNOPQRSTUVWXY][0-9][ABEHMNPRVWXY])))) [0-9][ABDEFGHJLNPQRSTUWXYZ]{2})/;
					
					if( !poscode_regex.test( $(this).val() ) )
					{
						pass_validation = false;
						error_message.push(valit_postcode);
					} 
						
				}
				
				if ($(this).data('valit-len'))
				{			
				
					var char_len = valit_length.split('|');	
					if($(this).val().length < char_len[0])
					{
						pass_validation = false;
						error_message.push(char_len[1]);
					} 
				}
								
			
				// If any validations fail, return an error message
				if ( pass_validation != true ) 
				{
				// Output the error message
					if ( !$(this).hasClass(defaults.input_error_class) ) // Only output the error once
					{
						// Add error classes
						$(this).addClass(defaults.input_error_class);
						if (defaults.add_error_to_parent == true)
						{
							$(this).parent().addClass(defaults.parent_error_class);
						}
						
						// Remove any of the success classes if this fails after a successful pass
						$(this).removeClass(defaults.input_success_class);
						$(this).parent().removeClass(defaults.parent_success_class);
						
						// Loop through error message array
						$.each(error_message, function( i ) {
						  valit_label.append('<'+ defaults.wrap_error_message + ' class ="' + defaults.wrap_error_class +'">'+ error_message[i] +'</' + defaults.wrap_error_message + '>');
						});
					}
				} 
				else
				{
					if ( $(this).hasClass(defaults.input_error_class) ) // Remove the validation error messages
					{
						valit_label.removeClass(defaults.error_class).children(defaults.wrap_error_message).remove();
					}
					
					if (defaults.add_success_to_parent == true)
					{
						$(this).parent().addClass(defaults.parent_success_class);
					}
				}
				
				function validate_number(number)
				{
					var number_regex = /[0-9 -()+]+$/;
						
					if( number_regex.test( number ) )
					{
						return true;
					} 	
				}
			}
		});		
	};
} ( jQuery ));