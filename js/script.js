<<<<<<< HEAD
const url = 'http://localhost:5002/mensagem';
=======
const url = 'https://7gnixpkou4.execute-api.sa-east-1.amazonaws.com/getmensagem';
>>>>>>> 6077e148fc8d4a8f03c227f7021f287b45f6c2f2
var request = new XMLHttpRequest();
request.open("GET", url, true);

(function () {
  var Message;
  Message = function (arg) {
    this.text = arg.text, this.message_side = arg.message_side;
    this.draw = function (_this) {
      return function () {
        var $message;
        $message = $($('.message_template').clone().html());
        $message.addClass(_this.message_side).find('.text').html(_this.text);
        $('.messages').append($message);
        return setTimeout(function () {
          return $message.addClass('appeared');
        }, 0);
      };
    }(this);
    return this;
  };
  $(function () {
    var getMessageText, message_side, sendMessage;
    message_side = 'right';
    getMessageText = function () {
      var $message_input;
      $message_input = $('.message_input');
      return $message_input.val();
    };
    sendMessage = function (text) {
      var $messages, message;
      if (text.trim() === '') {
        return;
      }
      $('.message_input').val('');
      $messages = $('.messages');
      message_side = message_side === 'left' ? 'right' : 'left';
      message = new Message({
        text: text,
        message_side: message_side
      });
      message.draw();
      return $messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
    };
    $('.send_message').click(function (e) {
      return sendMessage(getMessageText());
    });
    $('.message_input').keyup(function (e) {
      if (e.which === 13) {
        return sendMessage(getMessageText());
      }
    });

    request.onload = function() {
      var data = JSON.parse(this.response);
      if(request.status == 200){
<<<<<<< HEAD
        data.forEach(mensagem => {
          sendMessage(mensagem.texto);
        });
      }
  }
  request.send();
  });
  
}.call(this));
=======
        Object.values(data).forEach(
          mensagem => {
            for(x in mensagem){
              sendMessage(mensagem[x].texto)
            }
          }
        );
      }
    }
    request.send();
  });
  
}.call(this));
>>>>>>> 6077e148fc8d4a8f03c227f7021f287b45f6c2f2
