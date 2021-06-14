import {contactButton} from './components/contactButton.js'

new Vue({
    el: '#app',
    components: {
        'contact-button' : contactButton
    },
    data() {
        return {
            reviews: [
                {src: 'dist/img/reviews/review_6981.JPG'},
                {src: 'dist/img/reviews/review_6982.JPG'},
                {src: 'dist/img/reviews/review_6983.JPG'},
                {src: 'dist/img/reviews/review_6984.JPG'},
                {src: 'dist/img/reviews/review_6985.JPG'},
                {src: 'dist/img/reviews/review_6986.JPG'},
                {src: 'dist/img/reviews/review_6987.JPG'},
                {src: 'dist/img/reviews/review_6988.JPG'},
                {src: 'dist/img/reviews/review_6989.JPG'},
                {src: 'dist/img/reviews/review_6990.JPG'},
            ],
            showcases: [
                
            ],
            deliver: 30,
            product: 'แชมพูบ้านนา',
            formData: {
                name: '',
                address: '',
                mobile: '',
                product: '',
                price: '',
                description: '',
                source: ''
            }
        }
    },
    mounted() {
        // this.importAll(require.context('../img/reviews/', true, /\.jpg$/))
    },
    computed: {
        checkFormOrder() {
            let is_mobile = this.formData.mobile.length === 10 ? true : false
            if(!is_mobile) {
                document.getElementById('mobile-alert').innerHTML = "หมายเลขโทรศัพท์จะต้องมี 10 ตัว และเป็นตัวเลขเท่านั้น"
            }else{
                document.getElementById('mobile-alert').innerHTML = ""
            }

            return (this.formData.name !== '' &&
                    this.formData.address !== '' &&
                    this.formData.mobile !== '' &&
                    is_mobile && 
                    this.formData.product !== '')
                    ? true : false
        }
    },
    methods: {
        importAll(r) {
          r.keys().forEach(key => (this.reviews.push({ pathLong: r(key), pathShort: key })));
        },
        confirmOrder() {
            if(this.checkFormOrder) {
                let price = this.formData.product.split(" ")
                this.formData.product = this.product + " " + price[0]
                this.formData.price = parseInt(price[1]) === 250 ? parseInt(price[1]) + this.deliver : price[1]
                this.formData.source = window.location.origin
                try{
                    axios.post("https://shop.orderpang-sv.com/tmporder/save" , this.formData, {
                        headers: {
                            'Content-Type' : 'application/json'
                        }
                    })
                    .then((response) => {
                        window.location.replace(this.formData.source + "/thankyou.html?price=" + this.formData.price)
                    })
                    .finally(() => {
                        this.formData.name = ''
                        this.formData.address = ''
                        this.formData.mobile = ''
                        this.formData.product = ''
                        this.formData.description = ''
                    })
                }catch(e){
                    throw e
                }
            }
        },
        backToIndex() {
            window.history.back();
        }
    }
})