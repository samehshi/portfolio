#!/usr/bin/env ruby

require 'yaml'
require 'fileutils'

class StructureValidator
  def initialize
    @errors = []
    @warnings = []
    @success = []
  end

  def validate_all
    puts "🔍 Validating Jekyll site structure against requirements..."
    puts "=" * 60
    
    validate_jekyll_config
    validate_cv_data_structure
    validate_projects_structure
    validate_layout_files
    validate_includes_structure
    validate_assets_structure
    validate_dependencies
    
    print_results
  end

  private

  def validate_jekyll_config
    puts "\n📋 Validating Jekyll Configuration..."
    
    config_file = '_config.yml'
    if File.exist?(config_file)
      @success << "✅ Jekyll configuration file exists"
      
      config = YAML.load_file(config_file)
      
      # Check collections
      if config['collections'] && config['collections']['projects']
        @success << "✅ Projects collection is configured"
        
        if config['collections']['projects']['output'] == true
          @success << "✅ Projects collection output is enabled"
        else
          @warnings << "⚠️  Projects collection output should be enabled"
        end
      else
        @errors << "❌ Projects collection is not configured"
      end
      
      # Check plugins
      required_plugins = [
        'jekyll-jupyter-notebook',
        'jekyll-imagemagick',
        'jekyll-sitemap',
        'jekyll-minifier'
      ]
      
      plugins = config['plugins'] || []
      required_plugins.each do |plugin|
        if plugins.include?(plugin)
          @success << "✅ Plugin #{plugin} is configured"
        else
          @warnings << "⚠️  Plugin #{plugin} is missing"
        end
      end
      
    else
      @errors << "❌ Jekyll configuration file not found"
    end
  end

  def validate_cv_data_structure
    puts "\n👤 Validating CV Data Structure..."
    
    cv_file = '_data/cv.yml'
    if File.exist?(cv_file)
      @success << "✅ CV data file exists"
      
      begin
        cv_data = YAML.load_file(cv_file)
        
        if cv_data.is_a?(Array)
          @success << "✅ CV data has correct array structure"
          
          # Check for required sections
          section_titles = cv_data.map { |section| section['title'] }
          required_sections = ['General Information', 'Experience', 'Education', 'Skills']
          
          required_sections.each do |section|
            if section_titles.include?(section)
              @success << "✅ CV section '#{section}' exists"
            else
              @warnings << "⚠️  CV section '#{section}' is missing"
            end
          end
          
          # Validate section types
          cv_data.each do |section|
            if section['type'] && ['map', 'list', 'time_table', 'nested_list'].include?(section['type'])
              @success << "✅ CV section '#{section['title']}' has valid type: #{section['type']}"
            else
              @warnings << "⚠️  CV section '#{section['title']}' has invalid or missing type"
            end
          end
          
        else
          @errors << "❌ CV data should be an array of sections"
        end
        
      rescue Psych::SyntaxError => e
        @errors << "❌ CV data file has YAML syntax error: #{e.message}"
      end
      
    else
      @errors << "❌ CV data file not found"
    end
  end

  def validate_projects_structure
    puts "\n📁 Validating Projects Structure..."
    
    projects_dir = '_projects'
    if Dir.exist?(projects_dir)
      @success << "✅ Projects directory exists"
      
      # Count different types of project files
      md_files = Dir.glob("#{projects_dir}/*.md").length
      ipynb_files = Dir.glob("#{projects_dir}/*.ipynb").length
      yml_files = Dir.glob("#{projects_dir}/*frontmatter.yml").length
      project_dirs = Dir.glob("#{projects_dir}/*/").length
      
      @success << "✅ Found #{md_files} Markdown project files"
      @success << "✅ Found #{ipynb_files} Jupyter notebook files"
      @success << "✅ Found #{yml_files} frontmatter YAML files"
      @success << "✅ Found #{project_dirs} project directories"
      
      if md_files + ipynb_files + project_dirs > 0
        @success << "✅ Projects directory contains project files"
      else
        @warnings << "⚠️  No project files found"
      end
      
    else
      @errors << "❌ Projects directory not found"
    end
  end

  def validate_layout_files
    puts "\n🎨 Validating Layout Files..."
    
    layouts_dir = '_layouts'
    if Dir.exist?(layouts_dir)
      @success << "✅ Layouts directory exists"
      
      required_layouts = ['cv.liquid', 'page.liquid', 'distill.liquid']
      required_layouts.each do |layout|
        if File.exist?(File.join(layouts_dir, layout))
          @success << "✅ Layout file #{layout} exists"
        else
          @warnings << "⚠️  Layout file #{layout} is missing"
        end
      end
      
    else
      @errors << "❌ Layouts directory not found"
    end
  end

  def validate_includes_structure
    puts "\n🧩 Validating Includes Structure..."
    
    includes_dir = '_includes'
    if Dir.exist?(includes_dir)
      @success << "✅ Includes directory exists"
      
      # Check CV components
      cv_dir = File.join(includes_dir, 'cv')
      if Dir.exist?(cv_dir)
        @success << "✅ CV includes directory exists"
        
        cv_components = ['list.liquid', 'map.liquid', 'time_table.liquid', 'nested_list.liquid']
        cv_components.each do |component|
          if File.exist?(File.join(cv_dir, component))
            @success << "✅ CV component #{component} exists"
          else
            @warnings << "⚠️  CV component #{component} is missing"
          end
        end
      else
        @errors << "❌ CV includes directory not found"
      end
      
      # Check project components
      project_includes = ['projects.liquid', 'projects_horizontal.liquid']
      project_includes.each do |include|
        if File.exist?(File.join(includes_dir, include))
          @success << "✅ Project include #{include} exists"
        else
          @warnings << "⚠️  Project include #{include} is missing"
        end
      end
      
    else
      @errors << "❌ Includes directory not found"
    end
  end

  def validate_assets_structure
    puts "\n🎯 Validating Assets Structure..."
    
    assets_dir = 'assets'
    if Dir.exist?(assets_dir)
      @success << "✅ Assets directory exists"
      
      required_subdirs = ['img', 'css', 'js', 'pdf']
      required_subdirs.each do |subdir|
        if Dir.exist?(File.join(assets_dir, subdir))
          @success << "✅ Assets subdirectory #{subdir} exists"
        else
          @warnings << "⚠️  Assets subdirectory #{subdir} is missing"
        end
      end
      
    else
      @errors << "❌ Assets directory not found"
    end
  end

  def validate_dependencies
    puts "\n📦 Validating Dependencies..."
    
    gemfile = 'Gemfile'
    if File.exist?(gemfile)
      @success << "✅ Gemfile exists"
      
      gemfile_content = File.read(gemfile)
      required_gems = [
        'jekyll',
        'jekyll-jupyter-notebook',
        'jekyll-imagemagick',
        'jekyll-sitemap'
      ]
      
      required_gems.each do |gem|
        if gemfile_content.include?(gem)
          @success << "✅ Gem #{gem} is in Gemfile"
        else
          @warnings << "⚠️  Gem #{gem} is missing from Gemfile"
        end
      end
      
    else
      @errors << "❌ Gemfile not found"
    end
  end

  def print_results
    puts "\n" + "=" * 60
    puts "📊 VALIDATION RESULTS"
    puts "=" * 60
    
    if @success.any?
      puts "\n✅ SUCCESS (#{@success.length}):"
      @success.each { |msg| puts "  #{msg}" }
    end
    
    if @warnings.any?
      puts "\n⚠️  WARNINGS (#{@warnings.length}):"
      @warnings.each { |msg| puts "  #{msg}" }
    end
    
    if @errors.any?
      puts "\n❌ ERRORS (#{@errors.length}):"
      @errors.each { |msg| puts "  #{msg}" }
    end
    
    puts "\n" + "=" * 60
    
    if @errors.empty?
      puts "🎉 VALIDATION PASSED! Site structure is valid."
      puts "   #{@success.length} checks passed, #{@warnings.length} warnings"
    else
      puts "💥 VALIDATION FAILED! #{@errors.length} critical errors found."
      puts "   Please fix errors before proceeding."
    end
    
    puts "=" * 60
  end
end

# Run validation
validator = StructureValidator.new
validator.validate_all