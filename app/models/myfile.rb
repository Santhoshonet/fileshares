class Myfile < ActiveRecord::Base
  belongs_to :directory
  validates_presence_of :name, :length,  :content_type, :data, :directory_id
  before_save :setdownloadrefid


  def uploaded_file=(incoming_file)
    self.name = incoming_file.original_filename
    self.content_type = incoming_file.content_type
    self.data = incoming_file.read
  end

  def filename=(new_filename)
    write_attribute("filename", sanitize_filename(new_filename))
  end

  private
  def sanitize_filename(filename)
    just_filename = File.basename(filename)
    just_filename.gsub(/[^\w\.\-]/,'_')
  end

  def setdownloadrefid
    val = Time.current.to_s.gsub(" ","")
    val = val.to_s.gsub(":","").gsub("-","").gsub("C","").gsub("T","").gsub("U","")
    val = val.reverse
    self.downloadid = val
  end

end
