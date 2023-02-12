const Employee = require('./models/Employee');
const User = require('./models/User');

exports.resolvers = {
    Query: {

        login: async (parent, args) => {
            // Search for the user with the provided username
            const user = await User.findOne({ username: args.username });
            
            // If no user is found, return anerror
            if (!user) {
                throw new Error("User not found");
            }
            
            
            
            if (user.password !== args.password) {
                throw new Error('Incorrect password');
              }
            
            // Return the success message
            return "Login successful";
        },
        

        //   employees
        getEmployees: async (parent, args) => {
            return Employee.find({})
        },
        getEmployeeByID: async (parent, args) => {
            return Employee.findById(args.id)
        },
       
    },

    Mutation: {
            // users
        createAccount: async (parent,args) => {
         
            let newUser = new User({
                username:args.username,
                email : args.email,
                password: args.password
            })
            return  newUser.save()
              
          },
        //   employees
        addEmployee: async (parent, args) => {
            console.log(args)

            let newEmp = new Employee({
                firstname: args.firstname,
                lastname: args.lastname,
                email: args.email,
                gender: args.gender,
                city: args.city,
                designation: args.designation,
                salary: args.salary
            })

            return newEmp.save()
        },
        updateEmployee: async (parent, args) => {
            console.log(args)
            if (!args.id){
                return;
            }

            return await Employee.findOneAndUpdate(
            {
                _id: args.id
            },
            {
                $set: {
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    gender: args.gender,
                    city: args.city,
                    designation: args.designation,
                    salary: args.salary
                }
            }, {new: true}, (err, employee) => {
                if (err) 
                {
                    console.log('Something went wrong when updating the employee');
                } else 
                {
                    return employee
                }
            }
        );
      },
      deleteEmployee: async (parent, args) => {
       
        if (!args.id){
            return JSON.stringify({status: false, "message" : "No ID found"});
        }
        return await Employee.findByIdAndDelete(args.id)
      }
    }
}