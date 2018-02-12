defmodule CalcTest do
  use ExUnit.Case
  doctest Calc

  test "greets the world" do
    assert Calc.hello() == :world
  end

  test "1+2" do
    assert Calc.eval("1 + 2") == 3
  end

end
