$(document).ready(function()
{

    // fix the height of main_slider, according to acquire the screen height of user's
    var slider_height = $(document).height();
    var set_slider_height = $(".main_slider")
    set_slider_height.height(slider_height-140);

    var left_menu = $(".menu")
    var right_canvas = $(".container")
    left_menu.height(slider_height-140);
    right_canvas.height(slider_height-140)

    var cartoon = $(".main_slider");
    var dialog_count = 0;
    var tips = $(".tips");
    var second_count = 0;
    var max_second = 3;

    // appear the tip to push user click the screen
    function show_tips()
    {
        second_count ++;
        if(second_count > max_second){
            clearInterval(index);
        }else{
            tips.css("display","inline-block");
        }
    }

    var index = setTimeout(show_tips,1000);
    //  create the animation in the home page. Controlled by user to decide the speed about the dialog.
    cartoon.on("click",function()
    {
        tips.css("display","none");
        for(var i = 0;i < 4;i++){
            $(".dialog p:eq("+ i +")").css("display","none");
        }
        switch(dialog_count){
            case 0:  
                $(".index_img1").animate({bottom:'4%'}).animate({bottom:"3%"});                
                $(".dialog p:eq(0)").css("display","inline-block");
                dialog_count ++;
                break;
            case 1:                  
                $(".index_img2").animate({bottom:'4%'}).animate({bottom:"3%"});
                $(".dialog p:eq(1)").css("display","inline-block");
                dialog_count ++;
                break;
            case 2:                   
                $(".index_img1").animate({bottom:'4%'}).animate({bottom:"3%"});
                $(".dialog p:eq(2)").css("display","inline-block");
                dialog_count ++;
                break;
            case 3:                  
                $(".index_img2").animate({bottom:'4%'}).animate({bottom:"3%"});
                $(".dialog p:eq(3)").css("display","inline-block");
                dialog_count ++;
                break;
            case 4:
                for(var i = 0;i < 4;i++){
                    $(".dialog p:eq("+ i +")").css("display","none");
                }
                $(".cursor_hand").css("display","inline-block");
                $(".cursor_hand").animate({top:"5px"}).animate({top:"0"}).animate({top:"5px"}).animate({top:"0"}).animate({top:"5px"}).animate({top:"0"}).animate({top:"5px"}).animate({top:"0"})
        }
    });

//   Function: search bar on the top of the website; Used for users to search what they want to know, then jump the corresponding webpage directrly.      
    var search_bar = $("#search_bar");
    var search_bar_btn = $("#search_bar_btn");
    var keyword = {
        "history.html":[
            "history","feature","pattern","hazard","distance","behaviour","factor"
        ],
        "quiz.html":[
            "quiz","test","grade"
        ],
        "mini_game.html":[
            "game","play"
        ],
        "drawing_board.html":[
            "drawing","picture","image","colour","pencil"
        ]
    };
    search_bar_btn.on("click",function(){
        search_value = search_bar.val().toLowerCase();
        console.log(search_value);
        Object.keys(keyword).forEach(function(key){
            if(keyword[key].indexOf(search_value) > -1){
                var press_btn = window.confirm("Do you want to jump to following webpage?      "+ search_value + ".html");
                if(press_btn == true){
                    window.location.href = key;
                }else{
                    window.history.go(0);
                }
            }
        });
            
    });

//     Used for quiz.html. When user finish their quiz, they need to submit their answer, then it will return the grade,
//      and ask if they want to redo the quiz. If not, it will display the right answer about this quiz; If click "Yes",
//      they need to continue their work.
        var quiz_1_button = $("#quiz_1_button");
        var quiz_2_button = $("#quiz_2_button");
        var quiz_3_button = $("#quiz_3_button");
        var submit_btn = $(".submit_btn");
        var shadow_show_grade = $(".shadow_show_grade")[0];
        var grade = 0;
        var btn_yes = $(".Yes");
        var btn_no = $(".No");

        // toggle the different quiz
        quiz_1_button.on("click",function(){
            $("#quiz_1").addClass("show");
            $("#quiz_1").removeClass("hide");
            $("#quiz_2").addClass("hide");
            $("#quiz_2").removeClass("show");
            $("#quiz_3").addClass("hide");
            $("#quiz_3").removeClass("show");
        });
        quiz_2_button.on("click",function(){
            $("#quiz_1").addClass("hide");
            $("#quiz_1").removeClass("show");
            $("#quiz_2").addClass("show");
            $("#quiz_2").removeClass("hide");
            $("#quiz_3").addClass("hide");
            $("#quiz_3").removeClass("show");
        })
        quiz_3_button.on("click",function(){
            $("#quiz_1").addClass("hide");
            $("#quiz_1").removeClass("show");
            $("#quiz_2").addClass("hide");
            $("#quiz_2").removeClass("show");
            $("#quiz_3").addClass("show");
            $("#quiz_3").removeClass("hide");
        })
        submit_btn.on("click",function(){
            var question_1 = $('input[name="Question1"]:checked').val();
            var question_2 = $('input[name="Question2"]:checked').val();
            var question_3 = $('input[name="Question3"]:checked').val();
            var question_4 = $('input[name="Question4"]:checked').val();
            var question_5 = $('input[name="Question5"]:checked').val();
            for(var i = 1;i<=5;i++){
                if($('input[name="Question'+i+'"]:checked').val() == $(".question_"+i+" input[type=hidden]").val()){
                    grade += 20;
                }
            }
            answer_check(grade);
        })
        var answer_check = function(grade){
            shadow_show_grade.style.display = "inline-block";
            $(".show_grade h2 span").html(grade);
        }
        btn_yes.on("click",function(){
            grade = 0;
            shadow_show_grade.style.display = "none";
        });
        btn_no.on("click",function(){
            shadow_show_grade.style.display = "none";
            $(".right_answer").css("display","inline-block");
        });
});