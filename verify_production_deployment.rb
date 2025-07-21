#!/usr/bin/env ruby

require 'net/http'
require 'uri'
require 'json'
require 'time'

class ProductionVerifier
  def initialize(production_url = 'https://samehshi.github.io/portfolio')
    @production_url = production_url
    @verification_results = []
  end

  def run_verification
    puts "🚀 Production Deployment Verification"
    puts "=" * 50
    puts "Production URL: #{@production_url}"
    puts "=" * 50
    
    # Test site availability
    verify_site_availability
    
    # Test key pages
    verify_key_pages
    
    # Test image loading
    verify_image_loading
    
    # Test responsive images
    verify_responsive_images
    
    # Test project functionality
    verify_project_functionality
    
    # Test performance
    verify_performance_features
    
    # Generate final report
    generate_verification_report
  end

  private

  def verify_site_availability
    puts "\n🌐 Verifying Site Availability"
    puts "-" * 35
    
    begin
      uri = URI(@production_url)
      response = Net::HTTP.get_response(uri)
      
      if response.code == '200'
        puts "✅ Production site is accessible"
        puts "   Status: #{response.code}"
        puts "   Server: #{response['server']}"
        puts "   Last Modified: #{response['last-modified']}"
        
        @verification_results << {
          test: 'Site Availability',
          status: 'PASS',
          details: "HTTP #{response.code} - Site accessible"
        }
      else
        puts "❌ Site returned status: #{response.code}"
        @verification_results << {
          test: 'Site Availability',
          status: 'FAIL',
          details: "HTTP #{response.code}"
        }
      end
    rescue => e
      puts "❌ Error accessing site: #{e.message}"
      @verification_results << {
        test: 'Site Availability',
        status: 'FAIL',
        details: e.message
      }
    end
  end

  def verify_key_pages
    puts "\n📄 Verifying Key Pages"
    puts "-" * 25
    
    pages = [
      { path: '/', name: 'Home Page' },
      { path: '/projects/', name: 'Projects Page' },
      { path: '/cv/', name: 'CV Page' },
      { path: '/Certs%20&%20badges/', name: 'Certifications Page' }
    ]
    
    pages.each do |page|
      verify_page(page[:path], page[:name])
    end
  end

  def verify_page(path, name)
    begin
      uri = URI("#{@production_url}#{path}")
      response = Net::HTTP.get_response(uri)
      
      if response.code == '200'
        content = response.body
        
        # Basic content checks
        has_title = content.include?('<title>')
        has_content = content.length > 1000
        has_navigation = content.include?('nav') || content.include?('navbar')
        
        if has_title && has_content && has_navigation
          puts "  ✅ #{name} - Working correctly"
          @verification_results << {
            test: "Page: #{name}",
            status: 'PASS',
            details: "Page loads with proper content (#{content.length} chars)"
          }
        else
          puts "  ⚠️  #{name} - Loads but may have issues"
          @verification_results << {
            test: "Page: #{name}",
            status: 'WARNING',
            details: "Page loads but missing some elements"
          }
        end
      else
        puts "  ❌ #{name} - Status: #{response.code}"
        @verification_results << {
          test: "Page: #{name}",
          status: 'FAIL',
          details: "HTTP #{response.code}"
        }
      end
    rescue => e
      puts "  ❌ #{name} - Error: #{e.message}"
      @verification_results << {
        test: "Page: #{name}",
        status: 'FAIL',
        details: e.message
      }
    end
  end

  def verify_image_loading
    puts "\n🖼️  Verifying Image Loading"
    puts "-" * 28
    
    begin
      uri = URI("#{@production_url}/projects/")
      response = Net::HTTP.get_response(uri)
      content = response.body
      
      # Count different image types
      img_tags = content.scan(/<img[^>]*>/).length
      picture_tags = content.scan(/<picture[^>]*>/).length
      webp_references = content.scan(/\.webp/).length
      
      puts "  📊 Image Statistics:"
      puts "     - IMG tags: #{img_tags}"
      puts "     - PICTURE tags: #{picture_tags}"
      puts "     - WebP references: #{webp_references}"
      
      if img_tags > 0 || picture_tags > 0
        puts "  ✅ Images are present on projects page"
        @verification_results << {
          test: 'Image Loading',
          status: 'PASS',
          details: "#{img_tags} img tags, #{picture_tags} picture tags"
        }
      else
        puts "  ❌ No images found on projects page"
        @verification_results << {
          test: 'Image Loading',
          status: 'FAIL',
          details: 'No images detected'
        }
      end
      
      if webp_references > 0
        puts "  ✅ WebP images are implemented"
        @verification_results << {
          test: 'WebP Images',
          status: 'PASS',
          details: "#{webp_references} WebP references found"
        }
      else
        puts "  ❌ No WebP images found"
        @verification_results << {
          test: 'WebP Images',
          status: 'FAIL',
          details: 'No WebP images detected'
        }
      end
    rescue => e
      puts "  ❌ Error verifying images: #{e.message}"
      @verification_results << {
        test: 'Image Loading',
        status: 'FAIL',
        details: e.message
      }
    end
  end

  def verify_responsive_images
    puts "\n📱 Verifying Responsive Images"
    puts "-" * 32
    
    begin
      uri = URI("#{@production_url}/projects/")
      response = Net::HTTP.get_response(uri)
      content = response.body
      
      # Check for responsive image techniques
      srcset_count = content.scan(/srcset=/).length
      sizes_count = content.scan(/sizes=/).length
      picture_count = content.scan(/<picture/).length
      
      puts "  📊 Responsive Image Features:"
      puts "     - srcset attributes: #{srcset_count}"
      puts "     - sizes attributes: #{sizes_count}"
      puts "     - picture elements: #{picture_count}"
      
      if srcset_count > 0 || picture_count > 0
        puts "  ✅ Responsive images implemented"
        @verification_results << {
          test: 'Responsive Images',
          status: 'PASS',
          details: "#{srcset_count} srcset, #{picture_count} picture elements"
        }
      else
        puts "  ❌ No responsive image techniques found"
        @verification_results << {
          test: 'Responsive Images',
          status: 'FAIL',
          details: 'No responsive image techniques detected'
        }
      end
    rescue => e
      puts "  ❌ Error verifying responsive images: #{e.message}"
      @verification_results << {
        test: 'Responsive Images',
        status: 'FAIL',
        details: e.message
      }
    end
  end

  def verify_project_functionality
    puts "\n🎯 Verifying Project Functionality"
    puts "-" * 35
    
    begin
      uri = URI("#{@production_url}/projects/")
      response = Net::HTTP.get_response(uri)
      content = response.body
      
      # Check for project cards
      project_cards = content.scan(/class=["'][^"']*card[^"']*["']/).length
      project_links = content.scan(/<a[^>]*href=["'][^"']*project[^"']*["']/).length
      
      puts "  📊 Project Elements:"
      puts "     - Project cards: #{project_cards}"
      puts "     - Project links: #{project_links}"
      
      if project_cards > 0
        puts "  ✅ Project cards are displaying"
        @verification_results << {
          test: 'Project Cards',
          status: 'PASS',
          details: "#{project_cards} project cards found"
        }
      else
        puts "  ❌ No project cards found"
        @verification_results << {
          test: 'Project Cards',
          status: 'FAIL',
          details: 'No project cards detected'
        }
      end
      
      # Check for Bootstrap grid
      grid_classes = content.scan(/class=["'][^"']*(?:col-|row)[^"']*["']/).length
      
      if grid_classes > 0
        puts "  ✅ Grid layout is working (#{grid_classes} grid classes)"
        @verification_results << {
          test: 'Grid Layout',
          status: 'PASS',
          details: "#{grid_classes} grid classes found"
        }
      else
        puts "  ❌ No grid layout detected"
        @verification_results << {
          test: 'Grid Layout',
          status: 'FAIL',
          details: 'No grid classes found'
        }
      end
    rescue => e
      puts "  ❌ Error verifying project functionality: #{e.message}"
      @verification_results << {
        test: 'Project Functionality',
        status: 'FAIL',
        details: e.message
      }
    end
  end

  def verify_performance_features
    puts "\n⚡ Verifying Performance Features"
    puts "-" * 35
    
    begin
      uri = URI(@production_url)
      response = Net::HTTP.get_response(uri)
      content = response.body
      
      # Check for performance optimizations
      lazy_loading = content.include?('loading="lazy"') || content.include?('lazy')
      minified_css = content.scan(/\.min\.css/).length
      minified_js = content.scan(/\.min\.js/).length
      
      puts "  📊 Performance Features:"
      puts "     - Lazy loading: #{lazy_loading ? 'Yes' : 'No'}"
      puts "     - Minified CSS files: #{minified_css}"
      puts "     - Minified JS files: #{minified_js}"
      
      performance_score = 0
      performance_score += 1 if lazy_loading
      performance_score += 1 if minified_css > 0
      performance_score += 1 if minified_js > 0
      
      if performance_score >= 2
        puts "  ✅ Good performance optimizations"
        @verification_results << {
          test: 'Performance Features',
          status: 'PASS',
          details: "#{performance_score}/3 optimizations implemented"
        }
      else
        puts "  ⚠️  Limited performance optimizations"
        @verification_results << {
          test: 'Performance Features',
          status: 'WARNING',
          details: "Only #{performance_score}/3 optimizations found"
        }
      end
    rescue => e
      puts "  ❌ Error verifying performance: #{e.message}"
      @verification_results << {
        test: 'Performance Features',
        status: 'FAIL',
        details: e.message
      }
    end
  end

  def generate_verification_report
    puts "\n📊 Production Verification Summary"
    puts "=" * 50
    
    passed = @verification_results.count { |r| r[:status] == 'PASS' }
    failed = @verification_results.count { |r| r[:status] == 'FAIL' }
    warnings = @verification_results.count { |r| r[:status] == 'WARNING' }
    
    puts "✅ Passed: #{passed}"
    puts "❌ Failed: #{failed}"
    puts "⚠️  Warnings: #{warnings}"
    puts "📊 Total Tests: #{@verification_results.length}"
    
    # Calculate deployment success rate
    success_rate = ((passed.to_f / @verification_results.length) * 100).round(1)
    puts "\n🎯 Deployment Success Rate: #{success_rate}%"
    
    if success_rate >= 90
      puts "🟢 Excellent deployment! All major features working."
    elsif success_rate >= 75
      puts "🟡 Good deployment with minor issues to address."
    else
      puts "🔴 Deployment has significant issues that need attention."
    end
    
    if failed > 0
      puts "\n❌ Failed Tests:"
      @verification_results.select { |r| r[:status] == 'FAIL' }.each do |result|
        puts "  - #{result[:test]}: #{result[:details]}"
      end
    end
    
    if warnings > 0
      puts "\n⚠️  Warnings:"
      @verification_results.select { |r| r[:status] == 'WARNING' }.each do |result|
        puts "  - #{result[:test]}: #{result[:details]}"
      end
    end
    
    puts "\n🔗 Production Site: #{@production_url}"
    puts "\n✅ Deployment verification completed!"
    
    # Save verification report
    report_data = {
      timestamp: Time.now.iso8601,
      production_url: @production_url,
      success_rate: success_rate,
      results: @verification_results
    }
    
    File.write('production_verification_report.json', JSON.pretty_generate(report_data))
    puts "📄 Detailed report saved to: production_verification_report.json"
  end
end

# Run the verification
if __FILE__ == $0
  verifier = ProductionVerifier.new
  verifier.run_verification
end