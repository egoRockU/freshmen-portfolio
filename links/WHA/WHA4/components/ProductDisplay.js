app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: 
  /*html*/
  `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <!--Code Challenge no. 6-->
        <!--insert your code using :class in img-->
        
        <img v-if = "inStock" :src="image" >
        <img v-else :src="image" class = "out-of-stock-img">

      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>

        <!--Code Challenge no. 1-->
        <p>{{description}}</p>
        <!--Put your code here-->
        <p>{{volume}}</p>
        <p v-if="inStock">In Stock</p>
        <p v-else>Out of Stock</p>

        <!--Code Challenge no. 7-->
        <p v-show = "onSale">{{sale}}</p>
        <!--Modify code challenge 3-->

        <!--Code Challenge no. 3-->
        <!--Put your code here-->
        <p v-show = "onSale">On Sale</p>
        
        <p>Shipping: {{ shipping }}</p>
       

        <!--Code Challenge no. 4-->
        <!--Put your code here-->
        <ul>
          <li v-for = "choose in choose" class="list">{{ choose }}</li>
        </ul>
        
        <ul style="display: flex">
          <li 
            v-for="(variant, index) in variants" 
            :key="variant.id" 
            @mouseover="updateVariant(index)" 
            class="color-circle" 
            :style="{ backgroundColor: variant.color }">
          </li>
        </ul>
        
        <button 
          class="button" 
          :class="{ disabledButton: !inStock }" 
          :disabled="!inStock" 
          v-on:click="addToCart">
          Add to Cart
        </button>

        <!--Code Challenge no. 5-->
        <!--Put your code here-->
        <button v-on:click="removeFromCart">Remove Items</button>

      </div>
    </div>
    <review-list v-if="reviews.length" :reviews="reviews"></review-list>
    <review-form @review-submitted="addReview"></review-form>
  </div>`,
  data() {
    return {
        product: 'Spy X Family Manga',
        brand: 'JUMP COMICS + :',
        // Code Challenge no. 1
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis vitae et leo duis ut diam quam. Nunc congue nisi vitae suscipit tellus mauris a diam maecenas. Orci sagittis eu volutpat odio facilisis mauris sit. Tristique senectus et netus et malesuada fames ac. Leo in vitae turpis massa sed elementum tempus. Tellus cras adipiscing enim eu turpis egestas. Rutrum quisque non tellus orci ac. Et pharetra pharetra massa massa. Elit ut aliquam purus sit amet. At varius vel pharetra vel turpis nunc. Vitae elementum curabitur vitae nunc sed velit dignissim sodales ut. Lobortis elementum nibh tellus molestie nunc.",
        // Add description
        selectedVariant: 0,
        
        // Code Challenge no. 3
        // Add onSale = boolean
        //onSale: true,
        // Code Challenge no. 2
        //Insert your code in variants
        variants: [
          { id: 0001, volume: 'Volume 1',color: '#87703c', image: './assets/images/volume1.webp', quantity: 50 ,onSale: true },
          { id: 0002, volume: 'Volume 2',color: '#542c2d', image: './assets/images/volume2.webp', quantity: 0 , onSale: false },
          { id: 0003, volume: 'Volume 3',color: '#0f122d', image: './assets/images/volume3.webp', quantity: 8 , onSale: false},
          { id: 0004, volume: 'Volume 4',color: '#237fc8', image: './assets/images/volume4.webp', quantity: 33 , onSale: true},
        ],
        // Code Challenge no. 4
        // Add an array
        choose: ['Hard Cover', 'Soft Cover', 'Colored', 'Black $ White'],
        reviews: []
    }
  },
  methods: {
      addToCart() {
          this.$emit('add-to-cart', this.variants[this.selectedVariant].id)  
      },
      updateVariant(index) {
          this.selectedVariant = index
      },
      addReview(review) {
        this.reviews.push(review)
      },
      // Code Challenge no. 5
      // Add removeFromCart()
      removeFromCart(){
        this.cart -= 1
      },
      // Note: this.cart -= 1, if the cart = 0, it will stop to decrement
  },
  computed: {
      title() {
          return this.brand + ' ' + this.product
      },
      volume(){
        return this.variants[this.selectedVariant].volume
      },
      image() {
          return this.variants[this.selectedVariant].image
      },
      inStock() {
          return this.variants[this.selectedVariant].quantity
      },
      shipping() {
        if (this.premium) {
          return 'Free'
        }
        return 2.99
      },
      // Code Challenge no. 7
      // Add sale()
      //use if then return ''
      //you can refer to the title()
      onSale(){
        return this.variants[this.selectedVariant].onSale
      },
      sale(){
        return this.brand + ' ' + this.product + ' is on Sale'
      }
  }
})