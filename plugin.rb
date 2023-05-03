# frozen_string_literal: true

# name: senate-plugin-uniswap
# about: Senate Discourse plugin for Uniswap
# version: 0.0.1
# authors: Senate
# url: https://senatelabs.xyz
# required_version: 2.7.0

# frozen_string_literal: true

PLUGIN_NAME = "senate_uniswap".freeze

after_initialize do
  module ::SenateUniswap
    class Engine < ::Rails::Engine
      engine_name PLUGIN_NAME
      isolate_namespace SenateUniswap
    end
  end

  require_dependency "application_controller"

  class SenateUniswap::CreateUniswapUserController < ::ApplicationController
    requires_plugin PLUGIN_NAME

    skip_before_action :verify_authenticity_token

    def create
      email = params[:email]

      uri = URI.parse("senatelabs.xyz/api/create-uniswap-user")
      request = Net::HTTP::Post.new(uri)
      request.content_type = "application/json"
      request.body = JSON.dump({
        "email" => email
      })

      req_options = {
        use_ssl: uri.scheme == "https",
      }

      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end

      response_body = JSON.parse(response.body)

      if response_body["success"]
        render json: { user: email }, status: 200
      else
        render json: { user: email }, status: 500
      end
    end
  end

  SenateUniswap::Engine.routes.draw do
    post "/create-uniswap-user/:email" => "create_uniswap_user#create"
  end

  Discourse::Application.routes.append do
    mount ::SenateUniswap::Engine, at: "/senate-uniswap"
  end
end
