# class User < ApplicationRecord
#   # Include default devise modules. Others available are:
#   # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
#   devise :database_authenticatable, :registerable,
#          :recoverable, :rememberable, :validatable
# end
# class User < ApplicationRecord
#   devise :database_authenticatable, :registerable,
#          :recoverable, :rememberable, :validatable,
#          :jwt_authenticatable, jwt_revocation_strategy: self

#   after_initialize :set_jti

#   def self.jwt_revoked?(payload, user)
#     user.jti != payload['jti']
#   end

#   def self.revoke_jwt(payload, user)
#     user.update(jti: SecureRandom.uuid)
#   end

#   private

#   def set_jti
#     self.jti ||= SecureRandom.uuid
#   end
# end
# class User < ApplicationRecord
#   devise :database_authenticatable, :registerable,
#          :recoverable, :rememberable, :validatable,
#          :jwt_authenticatable, jwt_revocation_strategy: self

#   after_initialize :set_jti

#   def self.jwt_revoked?(payload, user)
#     user.jti != payload['jti']
#   end

#   def self.revoke_jwt(payload, user)
#     user.update(jti: SecureRandom.uuid)
#   end

#   private

#   def set_jti
#     self.jti ||= SecureRandom.uuid
#   end
# end
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  after_initialize :set_jti

  def self.jwt_revoked?(payload, user)
    user.jti != payload['jti']
  end

  def self.revoke_jwt(payload, user)
    user.update(jti: SecureRandom.uuid)
  end

  private

  def set_jti
    self.jti ||= SecureRandom.uuid
  end
end


