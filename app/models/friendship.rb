class Friendship < ActiveRecord::Base
  validates :friender_id, :friendee_id, presence: true
  validates :friender_id, uniqueness: { scope: :friendee_id }

  belongs_to :friender,
    class_name: "User"

  belongs_to :friendee,
    class_name: "User"


end
