import { Dimensions } from 'react-native';

const window = Dimensions.get('window')
const xiaomi = require('../assets/xiaomi.jpeg')
const nokia = require('../assets/nokia.jpeg')
const iphone = require('../assets/iphone.jpeg')
const samsung = require('../assets/samsung.jpeg')
const bascket = require('../assets/bascket.png')
const arrowLeft = require('../assets/arrow_left.png')
const arrowRight = require('../assets/arrow_right.png')
const add = require('../assets/add.png')
const edit = require('../assets/edit.png')
const deleteIcon = require('../assets/delete.png')

const publicKey = 'pk_test_51IlDHOJHByrQdUKaQpZYG63vMzOkt3lTfvNDAH4TZpSjTNOB15ABQydXA4z4KMXD4xutsG2e11CP5EgHZl1k3AhY006KelqX0n'
const itemCount = 5;
const config = {
    clientId : '467343829803-9u0k06d4lcpmtpp7fp3mj6o49f6pmckr.apps.googleusercontent.com'
}

const images = {
    'xiaomi': xiaomi,
    'nokia': nokia,
    'iphone': iphone,
    'samsung': samsung,
}

const  urlLocal = 'https://server-for-shop.herokuapp.com'

const url = 'http://192.168.100.45:3000'

export {
    window, bascket, images, url, arrowLeft, arrowRight, publicKey, add, edit, deleteIcon, itemCount, config
}