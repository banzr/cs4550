defmodule Calc do
  @moduledoc """
  Documentation for Calc.
  """

  @doc """
  Hello world.

  ## Examples

      iex> Calc.hello
      :world

  """
  def hello do
    :world
  end

  def solve(n1, n2, "+") do
    IO.puts "add"
    IO.puts n1
    IO.puts n2
    n1 + n2
  end

  def solve(n1, n2, "-") do
    IO.puts "sub"
    n1 - n2
  end

  def solve(n1, n2, "/") do
    IO.puts "div"
    n1 / n2
  end

  def solve(n1, n2, "*") do
    IO.puts "mult"
    n1 * n2
  end

  def eval(str) do
    String.split(str)
    |> Enum.map_every(2, &Integer.parse/1)
    |> Enum.map_every(2, fn({k,v}) -> k end)
    |> (fn (e) ->
         IO.puts Enum.at(e,0)
         Calc.solve(Enum.at(e,0), 
          Enum.at(e,2),
          Enum.at(e,1)) 
          end).()
  end

  def parser(str) do
    String.splitter(str, ")", trim: true)
    |> (fn(x) -> Enum.map(String.splitter(x, " ", trim: true)) end).()
    
    |> IO.inspect
  end


end
