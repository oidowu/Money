class User < ActiveRecord::Base
  attr_reader :password

	validates :username, :password_digest, :session_token, presence: true
	validates :username, uniqueness: true
	validates :password, length: {minimum: 6, allow_nil: true}

	after_initialize :ensure_session_token

  has_attached_file :avi, default_url: "https://s3.amazonaws.com/money-dev/users/avis/000/000/020/original/russ.gif"
  validates_attachment_content_type :avi, content_type: /\Aimage\/.*\Z/

  has_many :posts,
    foreign_key: :author_id

  has_many :post_views,
    foreign_key: :viewer_id

  has_many :viewed_posts,
    through: :post_views,
    source: :post

  has_many :out_follows,
    foreign_key: :follower_id,
    class_name: "Follow"

  has_many :in_follows,
    foreign_key: :followee_id,
    class_name: "Follow"

  has_many :followers,
    through: :in_follows,
    source: :follower

  has_many :followed_users,
    through: :out_follows,
    source: :followee

  has_many :feed_posts,
    through: :followed_users,
    source: :viewed_posts


  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    user.password_is?(password) ? user : nil
  end

  def self.find_or_create_from_auth_hash(auth_hash)
    user = User.find_by(twitter_uid: auth_hash[:uid])
    if user.nil?
      user = User.create!(
        twitter_uid: auth_hash[:uid],
        username: auth_hash[:info][:nickname],
        password_digest: auth_hash[:credentials][:token],
        avi: auth_hash[:info][:image]
      )
    end
    user
  end
	def password=(password)
    @password = password
		self.password_digest = BCrypt::Password.create(password)
	end


	def password_is?(password)
		BCrypt::Password.new(self.password_digest).is_password?(password)
	end

	def reset_session_token!
		self.session_token = SecureRandom.base64
		self.save!
		self.session_token
	end

	private

	def ensure_session_token
		self.session_token ||= SecureRandom.base64
	end

	def new_session_token
		SecureRandom.base64
	end

end
