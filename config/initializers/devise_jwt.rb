Devise::JWT.config do |config|
    config.jwt do |jwt|
      jwt.secret = Rails.application.credentials[:jwt_secret_key]
    end
  end
  