# class JsonWebToken
#     HMAC_SECRET = Rails.application.secrets.secret_key_base
  
#     def self.encode(payload, exp = 1.month.from_now)
#       payload[:exp] = exp.to_i
#       JWT.encode(payload, HMAC_SECRET)
#     end
  
#     def self.decode(token)
#       decoded = JWT.decode(token, HMAC_SECRET)[0]
#       HashWithIndifferentAccess.new(decoded)
#     rescue JWT::DecodeError => e
#       nil
#     end
#     def self.revoke(token)
#       decoded_token = decode(token)
#       return false unless decoded_token
  
#       user = User.find_by(id: decoded_token[:user_id])
#       return false unless user
  
#       user.update(jti: SecureRandom.uuid) # Update the JTI to invalidate the token
#       true
#     rescue JWT::DecodeError => e
#       false
#     end
#   end
class JsonWebToken
  HMAC_SECRET = ENV['SECRET_KEY_BASE']
  
  
  def self.encode(payload, exp = 1.month.from_now)
    payload[:exp] = exp.to_i
    JWT.encode(payload, HMAC_SECRET)
  end

  def self.decode(token)
    begin
      decoded = JWT.decode(token, HMAC_SECRET)[0]
      HashWithIndifferentAccess.new(decoded)
    rescue JWT::ExpiredSignature
      Rails.logger.error("JWT Token has expired")
      nil
    rescue JWT::DecodeError => e
      Rails.logger.error("JWT Decode Error: #{e.message}")
      nil
    end
  end

  def self.revoke(token)
    decoded_token = decode(token)
    return false unless decoded_token
  
    user = User.find_by(id: decoded_token[:user_id])
    return false unless user
  
    user.update(jti: SecureRandom.uuid) # Update the JTI to invalidate the token
    true
  rescue JWT::DecodeError => e
    Rails.logger.error("JWT Revoke Error: #{e.message}")
    false
  end
end