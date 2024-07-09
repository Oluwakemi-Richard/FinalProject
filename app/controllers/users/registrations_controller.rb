# # app/controllers/users/registrations_controller.rb
class Users::RegistrationsController < Devise::RegistrationsController
    respond_to :json
  
    private
  
    def respond_with(resource, _opts = {})
      if resource.persisted?
        render json: { message: 'Signed up successfully.' }, status: :ok
      else
        render json: { message: "User couldn't be created successfully. #{resource.errors.full_messages.to_sentence}" }, status: :unprocessable_entity
      end
    end
  end
# class Users::RegistrationsController < Devise::RegistrationsController
#     respond_to :json
  
#     private
  
#     def respond_with(resource, _opts = {})
#       render json: resource
#     end
  
#     def respond_to_on_destroy
#       head :no_content
#     end
#   end
  