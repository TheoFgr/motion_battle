puts 'Coucou c nous'

user1 = User.create(email: "theo.faugere3@gmail.com", password: "azerty", pseudo: "GreeZz")

puts 'User created'

game1 = Game.create()

puts 'Games created'

participation1 = Participation.create(user_id: user1, game_id: game1)

puts 'WaitingRomm created'

puts "Eh we c nous les mec de cité"
