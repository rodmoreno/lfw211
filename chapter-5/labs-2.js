const assert = require('assert')

const Leopard = function (name) {
  this.name = name
}

Leopard.prototype.hiss = function() {
  console.log(`${this.name} hsss`)
}

const Lynx = function(name) {
  Leopard.call(this, name)
}

Object.setPrototypeOf(Lynx.prototype, Leopard.prototype)
Lynx.prototype.purr = function() {
  console.log(`${this.name} prrr`)
}

const Cat = function(name) {
  Lynx.call(this, `${name} the cat`)
}

Object.setPrototypeOf(Cat.prototype, Lynx.prototype)

Cat.prototype.meow = function() {
  console.log(`${this.name} meow`)
}

const felix = new Cat('Felix')
debugger
felix.meow() // prints Felix the cat: meow
felix.purr() // prints Felix the cat: prrr
felix.hiss() // prints Felix the cat: hsss

// prototype checks, do not remove
const felixProto = Object.getPrototypeOf(felix)
const felixProtoProto = Object.getPrototypeOf(felixProto)
const felixProtoProtoProto = Object.getPrototypeOf(felixProtoProto)

assert(Object.getOwnPropertyNames(felixProto).length, 1)
assert(Object.getOwnPropertyNames(felixProtoProto).length, 1)
assert(Object.getOwnPropertyNames(felixProtoProto).length, 1)
assert(typeof felixProto.meow, 'function')
assert(typeof felixProtoProto.purr, 'function')
assert(typeof felixProtoProtoProto.hiss, 'function')
console.log('prototype checks passed!')
