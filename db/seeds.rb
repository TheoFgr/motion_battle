Participation.destroy_all
Game.destroy_all
User.destroy_all

puts 'Coucou c nous'

user1 = User.create!(email: "theo.faugere3@gmail.com", password: "azerty", pseudo: "GreeZz")
user2 = User.create!(email: "user@gmail.com", password: "azerty", pseudo: "azer" )

puts 'User created'

game1 = Game.create!()

puts 'Games created'

participation1 = Participation.create!(user: user1, game: game1)

puts 'WaitingRomm created'

puts "Eh we c nous les mec de cité"
