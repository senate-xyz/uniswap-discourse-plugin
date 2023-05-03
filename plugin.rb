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
        uri = URI("http://dev.senatelabs.xyz/api/create-uniswap-user")
        response = Net::HTTP.get(uri)
        json = JSON.parse(response)

        render json: json, status: 200
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
