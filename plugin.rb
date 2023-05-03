# frozen_string_literal: true

# name: senate-plugin-uniswap
# about: Senate Discourse plugin for Uniswap
# version: 0.0.1
# authors: Senate
# url: https://senatelabs.xyz
# required_version: 2.7.0

PLUGIN_NAME = "senate".freeze

after_initialize do
  module ::SenateUniswap
    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace SenateUniswap
    end

    class ProxyExternalApiController < ::ApplicationController
      skip_before_action :verify_authenticity_token, only: [:proxy]
      
      def proxy
        email = params[:email]
        uri = URI.parse("https://dev.senatelabs.xyz/api/create-uniswap-user")
        
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = true
        request = Net::HTTP::Post.new(uri.request_uri, 'Content-Type' => 'application/json')
        request.body = { email: email }.to_json
        response = http.request(request)

        if response.code.to_i == 200
          api_response = JSON.parse(response.body)
          render json: { message: "User created successfully!", senate: api_response }, status: 200
        else
          render json: { message: "Could not create user", senate: response.body }, status: 500
        end
      end
    end
  end

  SenateUniswap::Engine.routes.draw do
    post "/create-senate-user" => "proxy_external_api#proxy"
  end

  Discourse::Application.routes.append do
    mount ::SenateUniswap::Engine, at: "/senate-uniswap"
  end
end
