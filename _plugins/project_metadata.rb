module Jekyll
  class ProjectMetadataGenerator < Generator
    safe true
    priority :high

    def generate(site)
      # Process project directories with frontmatter.yml files
      site.collections['projects'].docs.each do |project|
        next unless project.path.end_with?('frontmatter.yml')
        
        # Get the project directory
        project_dir = File.dirname(project.path)
        project_name = File.basename(project_dir)
        
        # Look for corresponding .md file or .ipynb file
        main_project = find_main_project(site, project_name)
        
        if main_project
          # Merge metadata from frontmatter.yml into main project
          merge_metadata(main_project, project)
          
          # Remove the frontmatter.yml from the collection to avoid conflicts
          site.collections['projects'].docs.delete(project)
        end
      end
    end

    private

    def find_main_project(site, project_name)
      site.collections['projects'].docs.find do |doc|
        doc_name = File.basename(doc.path, '.*')
        doc_name == project_name || doc.path.include?(project_name)
      end
    end

    def merge_metadata(main_project, frontmatter_project)
      # Merge data from frontmatter.yml into main project
      frontmatter_project.data.each do |key, value|
        # Don't override existing data in main project unless it's nil or empty
        existing_value = main_project.data[key]
        if existing_value.nil? || (existing_value.respond_to?(:empty?) && existing_value.empty?)
          main_project.data[key] = value
        end
      end
      
      # Ensure the main project has the correct layout
      if frontmatter_project.data['layout']
        main_project.data['layout'] = frontmatter_project.data['layout']
      end
    end
  end
end