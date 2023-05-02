# frozen_string_literal: true

# name: uniswap-discourse-plugin
# about: Senate Discourse plugin for Uniswap
# version: 0.0.1
# authors: Senate
# url: https://senatelabs.xyz
# required_version: 2.7.0

enabled_site_setting :plugin_name_enabled

module ::MyPluginModule
  PLUGIN_NAME = "uniswap-discourse-plugin"
end

require_relative "lib/my_plugin_module/engine"

after_initialize do
  # Code which should run after Rails has finished booting
end
