if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection_pool.disconnect!  # Disconnect all connections
    ActiveSupport.on_load(:active_record) do
      if Rails.application.config.database_configuration[Rails.env]['adapter'] == 'postgresql'
        config = Rails.application.config.database_configuration[Rails.env]
        config['reaping_frequency'] = ENV['DB_REAP_FREQ'] || 10 # seconds
        config['pool']              = ENV['RAILS_MAX_THREADS'] || 5
        ActiveRecord::Base.establish_connection(config)
      end
    end
  end
  