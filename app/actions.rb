# Homepage (Root path)
get '/' do
  erb :index
end
 
get '/contacts' do
	@contacts = Contact.all
	@contacts.to_json
end

post '/contacts' do
	results = {result: false}
	@contact = Contact.new(first_name: params[:first_name], last_name: params[:last_name], phone: params[:phone], email: params[:email])
	if @contact.save
		@contact.to_json
	else
		results
	end
end

get '/contacts/:id' do
	Contact.find(params[:id])
end

put '/contacts/:id/edit' do
	@contact = Contact.find(params[:id])
	@contact.update(first_name: params[:first_name], last_name: params[:last_name], phone: params[:phone], email: params[:email])

end

delete '/contacts/:id' do
	Contact.find(params[:id]).destroy
	
end

