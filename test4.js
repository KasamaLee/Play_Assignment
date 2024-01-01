import * as priceModule from './calPrice.js'


const cartData = priceModule.readJson('./cart4.json')
const cartLists = cartData.cartItems;
const campaignLists = cartData.campaigns;
priceModule.calculateFinalPrice(cartLists, campaignLists)
