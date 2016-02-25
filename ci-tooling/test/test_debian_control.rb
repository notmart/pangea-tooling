# frozen_string_literal: true
#
# Copyright (C) 2016 Harald Sitter <sitter@kde.org>
#
# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation; either
# version 2.1 of the License, or (at your option) version 3, or any
# later version accepted by the membership of KDE e.V. (or its
# successor approved by the membership of KDE e.V.), which shall
# act as a proxy defined in Section 6 of version 3 of the license.
#
# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.
#
# You should have received a copy of the GNU Lesser General Public
# License along with this library.  If not, see <http://www.gnu.org/licenses/>.

require_relative '../lib/debian/control'
require_relative 'lib/testcase'

# Test debian/control
module Debian
  class ControlTest < TestCase
    def setup
      FileUtils.cp_r("#{@datadir}/.", Dir.pwd)
    end

    def test_old_names
      assert(Kernel.const_defined?(:DebianControl))
    end

    def test_parse
      assert_nothing_raised do
        c = Control.new
        c.parse!
      end
    end

    def test_key
      c = Control.new
      c.parse!
      assert_not_nil(c.source.key?('build-depends'))
    end

    def test_value
      c = Control.new
      c.parse!
      assert_equal(1, c.source['build-depends'].size)
      assert_nil(c.source.fetch('magic', nil))
    end

    def test_no_build_deps # Also tests !pwd opening
      c = Control.new(__method__)
      c.parse!
      assert_equal(nil, c.source.fetch('build-depends', nil),
                   "Found a build dep #{c.source.fetch('build-depends', nil)}")
    end
  end
end
