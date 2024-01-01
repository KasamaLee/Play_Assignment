import { readFile, readFileSync } from 'fs';

function readJson(path) {
    const jsonData = readFileSync(path, 'utf8')
    const cartData = JSON.parse(jsonData)
    return cartData
}

function calPrice(cart) {
    let sum = 0
    for (let item of cart) {
        // console.log(item.price)
        sum += (item.price * item.amount)
    }
    return sum
}

function fixedAmountDiscount(totalPrice, amount) {
    if (totalPrice < amount) {
        return totalPrice
    }
    return amount
}

function percentageDiscount(totalPrice, percentage) {
    // Discounts the entire cart by subtracting a percentage from the total price
    return totalPrice * (percentage / 100)
}

function discountByCategory(cartLists, category, amount) {
    // Discount the entire amount of a specific category of items in cart
    const categorizedCart = cartLists.filter(item => item.category === category)
    return calPrice(categorizedCart) * (amount / 100)
}

function discountByPoint(totalPrice, points) {
    let limit = totalPrice * (0.2)
    if (points > limit) {
        return limit
    }
    return points
}

function specialCampaigns(totalPrice, every, discount) {
    const count = Math.floor(totalPrice / every)
    return (discount * count)
}

function calculateFinalPrice(cart, campaigns) {
    cart.map((item) => console.log(`${item.amount} ${item.name}: ${item.price * item.amount} THB`))
    let totalPrice = calPrice(cart)
    let discount = 0;

    for (let camp of campaigns) {
        if (camp.category === 'Coupon') {
            if (camp.name === 'Fixed amount') {
                discount += fixedAmountDiscount(totalPrice, camp.amount)
                console.log('Fixed amount discount:', discount, 'THB')
            } else if (camp.name === 'Percentage discount') {
                discount += percentageDiscount(totalPrice, camp.percentage)
                console.log('Percentage discount:', discount, 'THB')
            }
        } else if (camp.category === 'On Top') {
            if (camp.name === 'Percentage discount by item category') {
                discount += discountByCategory(cart, camp.categoryParam, camp.percentage)
                console.log('Percentage discount by item category:', discount, 'THB')

            } else if (camp.name === 'Discount by points') {
                discount += discountByPoint(totalPrice, camp.points)
                console.log('Discount by points:', discount, 'Points')
            }
        } else if (camp.category === 'Seasonal') {
            if (camp.name === 'Special campaigns') {
                discount += specialCampaigns(totalPrice, camp.everyX, camp.discountY)
                console.log('Special campaigns:', discount, 'THB')
            }
        }
    }
    console.log('Total Price:', totalPrice - discount, 'THB')
    return totalPrice - discount
}


export { readJson, calPrice, fixedAmountDiscount, percentageDiscount, discountByCategory, discountByPoint, specialCampaigns, calculateFinalPrice }