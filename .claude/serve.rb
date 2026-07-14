require 'webrick'
root = '/tmp/mave-site'
port = (ENV['PORT'] || 4599).to_i
Dir.chdir(root)
server = WEBrick::HTTPServer.new(Port: port, DocumentRoot: root)
trap('INT') { server.shutdown }
trap('TERM') { server.shutdown }
server.start
