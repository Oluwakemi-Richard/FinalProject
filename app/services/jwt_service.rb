class JwtService
    SECRET_KEY = ENV['DEVISE_JWT_SECRET_KEY']
  
    def self.encode(payload)
      JWT.encode(payload, SECRET_KEY, 'HS256')
    end
  
    def self.decode(token)
      Rails.logger.debug "Decoding token: #{token}"
      decoded_token = JWT.decode(token, SECRET_KEY, true, { algorithm: 'HS256' })
      Rails.logger.debug "Decoded token: #{decoded_token}"
      HashWithIndifferentAccess.new(decoded_token[0])
    rescue JWT::DecodeError => e
      Rails.logger.error "JWT Decode Error: #{e.message}"
      nil
    end
  end
  
  