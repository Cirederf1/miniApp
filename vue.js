let app = Vue.createApp({
    data() {
      return {
        message: '',
        cochee: false,
        nbChar: 10,
        tweets: [],
        srcPhoto: "https://picsum.photos/200/200?",
        compteur: localStorage.getItem('compteur') || 0,
      };
    },
    watch: {
        compteur(){
            localStorage.setItem('compteur', this.compteur);
        }
    },
    computed: {
        reversedMessage () {
          // `this` pointe sur l'instance Vue
          return this.message.split('').reverse().join('');
        },
        nbCharRestant() {
            let nb_char_restant = this.nbChar - this.message.length;
            if (this.cochee) {
                nb_char_restant -= 5;
            }
            return nb_char_restant;
        },
        limiteAtteinte() {
            return this.nbCharRestant < 0;
        },
      },
    methods: {
        submit(){
            this.tweets.push(
                {text :this.message, 
                photo:this.cochee,
                srcPhoto: this.srcPhoto + Math.random()
            }
                );
            this.message = '';
            this.photo = false;
        },
        plus(){
            this.compteur++;
        },
        moins(){
            this.compteur--;
        },
        reset(){
            this.compteur = 0;
        }
    },
    
  })
  app.component('tweet', {
    template: `
    <p>{{text}}</p>
    <img v-if="photo" :src="srcphoto" alt="">
    `,
    props: {
        text: {type: String, required: true},
        photo: {type: Boolean, default: false},
        srcphoto: {type: String, required: false},
    },

  });

  app.mount('#app');
  