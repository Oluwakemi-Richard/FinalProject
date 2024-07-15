Warden::Manager.serialize_into_session(&:id)
Warden::Manager.serialize_from_session { |id| User.find_by(id: id) }

Warden::Manager.after_authentication do |user, auth, opts|
  # Do something after authentication
end

Warden::Manager.before_logout do |user, auth, opts|
  # Do something before logout
end

Warden::JWTAuth.configure do |config|
  config.secret = ENV['HMAC_SECRET']
  config.expiration_time = 1.day.to_i
  config.dispatch_requests = [['DELETE', %r{^/logout$}]]
  config.revocation_requests = [['DELETE', %r{^/logout$}]]
end
