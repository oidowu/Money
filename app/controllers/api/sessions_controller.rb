class Api::SessionsController < ApplicationController

	def create
		if auth_hash
			@user = User.find_or_create_from_auth_hash(auth_hash)
			login(@user)
			redirect_to "/"
		else
			@user = User.find_by_credentials(
	      params[:user][:username],
	      params[:user][:password]
	    )

	    if @user
				login(@user)
				render "api/users/show"
			else
				render(
		        json: {
							username: ["might be mistyped"],
							password: ["might be mistyped"]
						},
	        status: 401
	      )
			end
		end
	end

	def destroy
		@user = current_user
		if @user
			logout
			render "api/users/show"
		else
			render(
        json: ["Nobody signed in"],
        status: 404
      )
		end
	end

	private

	def auth_hash
		request.env['omniauth.auth']
	end

end
