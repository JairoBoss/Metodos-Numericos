function bisection(f::Function, a::Float64, b::Float64, eps::Float64, N)
    #=
    f: función continua en el intervalo [a,b]
    eps: tolerancia
    N: número máximo de pasos    
    =#
    n = 1 # n: número actual de pasos
    c = 0 
    while n <= N
        c = a+(b-a)/2 # ==(a+b)/2
        if (f(c)==0 || abs(b-a)) < eps
            return c, n
        end
        if f(a)f(c)<0
                b=c
        else
            a=c
        end
        n = n+1
        println(a, " ", b," ",c)
    end
        
end
