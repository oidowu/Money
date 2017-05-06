class User < ActiveRecord::Base
  attr_reader :password

	validates :username, :password_digest, :session_token, presence: true
	validates :username, uniqueness: true
	validates :password, length: {minimum: 6, allow_nil: true}

	after_initialize :ensure_session_token

  has_attached_file :avi, default_url: "https://s3.amazonaws.com/money-dev/users/avis/000/000/020/original/russ.gif"
  validates_attachment_content_type :avi, content_type: /\Aimage\/.*\Z/

  has_many :article_views,
    foreign_key: :viewer_id

  has_many :viewed_articles,
    through: :article_views,
    source: :article

  has_many :out_friendings,
    foreign_key: :friender_id,
    class_name: "Friendship"

  has_many :in_friendings,
    foreign_key: :friendee_id,
    class_name: "Friendship"

  has_many :in_friends,
    through: :in_friendings,
    source: :friender

  has_many :in_friend_articles,
    through: :in_friends,
    source: :viewed_articles

  has_many :out_friends,
    through: :out_friendings,
    source: :friendee

  has_many :out_friend_articles,
    through: :out_friends,
    source: :viewed_articles

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

  def feed_articles
    out_articles = self.out_friend_articles.includes(:viewers)
    in_articles =  self.in_friend_articles.includes(:viewers)
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
