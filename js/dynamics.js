/////////////////////////////////////////////////////////////////////////
//                                                                     //
//      ******************** The Analog clock ********************     //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
  //  Responsive voice intro voice  
    responsiveVoice.speak(
        "أهلاً بكم مع الساعةِ الناطِقه. هي ساعةُ حائِطٍ مُزَوَّدَه بساعة رقمِيَّة. وَ بِهَا خَاصِّيَّةُ النُّطق للوقت الحالي. يُمْكِنُكمُ اختيار الصوت المناسب. ثم الضغط على زِرِّ التَّحَدُّث لِتَشْغِيلِهَا. وَ سَتَتَوَفَّرُ مميزات أخرى. قَرِيبًا.", "Arabic Female");


      document.getElementById('announce').innerHTML = `Idea By: Nasr Galal`;
//*********************************************************************************************************************      
      
      //Defining the variables for the arms of the clock
      const /*or var*/ secondHand = document.querySelector('.second-hand');  
      const minHand = document.querySelector('.min-hand');        
      const hourHand = document.querySelector('.hour-hand');
      
      //programming JavaScript to get the current time and linking it to each hand alone
      function setDate() { //inside this function, we set the current date and time....
          //Updating current date
          const now = new Date();
          //Updating current time
          //Case 1: Updating Seconds
          const seconds = now.getSeconds();
          const secondsDegrees = ((seconds/60)*360) + 90;
          secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // Transforming seconds into circular motion
          
          //Case 2: Updating minutes
          const minutes = now.getMinutes();
          const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6) + 90;
          minHand.style.transform = `rotate(${minutesDegrees}deg)`;           // Transforming minutes into circular motion
          
          
          //Case 3: For Hours
          const hours = now.getHours();
          const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30) + 90 ;
          hourHand.style.transform = `rotate(${hoursDegrees}deg)`;    // Transforming hours into circular motion
          
      }
      //Setting thr interval to 1 sec
      setInterval(setDate, 1000);
      
/////////////////////////////////////////////////////////////////////////
//                                                                     //
//      ******************** The Digital clock ********************    //
//                                                                     //
//      ****************** Voice Narration added ******************    //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
    
        // Setting Voice Narration 
        const msg = new SpeechSynthesisUtterance(); //This is a method in JS .. For more, visit http://blog.teamtreehouse.com/getting-started-speech-synthesis-api
        
        // Setting array for voices, as We need to get all available voices
        let voices = [];
      
        const voicesDropdown = document.querySelector('[name="voice"]');
        const speakButton = document.querySelector('#speak');
        //linking voice with text in html document
       // msg.text = `Service is under construction at the moment, please try again later!`;
        // getting voices and adding them into the dropdown
        function populateVoices(){
            voices = this.getVoices();
            voicesDropdown.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang}) </option>`).join('');
        }
        // looping into all voices & finding and voice matching the name showing in the dropdown
        function setVoice() {
            msg.voice = voices.find(voice => voice.name === this.value);
        }
   
        // toggling the voice to start
        function toggle(startOver = true) {
            speechSynthesis.cancel();
            if (startOver) {
                speechSynthesis.speak(msg);
            }
        }
        
        speechSynthesis.addEventListener('voiceschanged', populateVoices);
    
        voicesDropdown.addEventListener('change', setVoice);

        speakButton.addEventListener('click', toggle);
      
      
        // The digital clock
        showTime();
      
        setInterval(showTime, 1000);
        function showTime() {
            var now = new Date();
            var ampm = "A M";
            var h = now.getHours();
            var m = now.getMinutes();
            var s = now.getSeconds();
            
            
            //(optional: Setting the 12 hours clock)
            if (h == 0) {
                h =  12;
            } else if (h > 12){
                h = h - 12;
                ampm = "P M";
            }
            // Adjusting digits as when it is < 0 , it should appear like 0n:0n:0n
            //if (h < 10) {
              //  h = "0" + h;
            //}
            
            if (m < 10) {
                m = "0" + m;
            }
            
            if (s < 10) {
                s = "0" + s;
            }
            
            // Blinker effect for the collon near seconds
            if (document.getElementById('collon').innerHTML == " ") document.getElementById('collon').innerHTML = ":";
            else document.getElementById('collon').innerHTML = " ";
           
            if (m == 0){
                msg.text = `Time now is - ${h}  , ${ampm}`
            }
            
            msg.text = `Time now is - ${h} , ${m} minutes , ${ampm}`
            document.getElementById('time').innerHTML = (h + " : " + m); 
            document.getElementById('secs').innerHTML = (s + "<br>" + ampm);
            
            var dayName = [ 
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat"
            ];

            var monthName = [ 
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec"
            ];
            
            var dayNumber = now.getDay();
            var monthNumber = now.getMonth();
            var dayDate = now.getDate();
            
            document.getElementById('date').innerHTML = 
                ("<p></p>" + monthName[monthNumber] + ", " + dayName[dayNumber] + " " + dayDate);
        }  
